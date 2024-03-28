"use server";

import { lucia, validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";

type CreateUserParams = {
  email: string;
  username: string;
  password: string;
};

export async function GetLoggedInUser() {
  const { user: LoggedInUser } = await validateRequest();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: LoggedInUser?.id,
      },
      select: {
        username: true,
        email: true,
        id: true,
        created_at: true,
        account: {
          select: {
            recipes: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return false;
  }
}

export async function CreateUser(params: CreateUserParams) {
  const userId = generateId(15);
  try {
    const user = await prisma.user.create({
      data: {
        id: userId,
        username: params.username,
        password: await new Argon2id().hash(params.password),
        email: params.email,
      },
    });
    await prisma.account.create({
      data: {
        user_id: user.id,
      },
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user.");
  }
}

export async function SignIn(params: Omit<CreateUserParams, "email">) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  const validPassword = await new Argon2id().verify(
    user.password,
    params.password
  );

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function SignOut() {
  const { session } = await validateRequest();
  if (!session) {
    throw new Error("Unauthorized Action");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
