"use server";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function GetAllRecipes(query?: string) {
  noStore();
  const data = await prisma.recipe.findMany({
    where: {
      title: { contains: query },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return data;
}

export async function GetRecipeByID(id: string) {
  noStore();
  const data = await prisma.recipe.findFirst({
    where: {
      id: { equals: id },
    },
  });
  return data;
}

type CreateRecipeSchema = {
  title: string;
  content: string;
  img_url: string;
  image_public_id: string;
};

export async function CreateRecipe(params: CreateRecipeSchema) {
  await prisma.recipe.create({
    data: {
      ...params,
    },
  });
  revalidatePath(`/home`);
}

export async function DeleteRecipe(recipe_id: string) {
  try {
    await prisma.recipe.delete({
      where: {
        id: recipe_id,
      },
    });
    revalidatePath(`/recipes`);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete recipe.");
  }
}
