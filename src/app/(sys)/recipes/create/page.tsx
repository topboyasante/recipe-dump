import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import CreateRecipeForm from "./create-recipe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Recipe | RecipeDump",
  description: "Share your recipes with the world",
};

async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="max-w-2xl mx-auto">
      <CreateRecipeForm author_id={user.id} />
    </div>
  );
}

export default Page;
