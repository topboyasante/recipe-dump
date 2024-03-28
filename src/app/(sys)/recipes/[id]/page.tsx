import { GetRecipeByID } from "@/services/recipe";
import React from "react";
import RecipeDetails from "./recipe-details";
import { notFound } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "View Recipe | RecipeDump",
  description: "Share your recipes with the world",
};

async function Page({ params }: Props) {
  const data = await GetRecipeByID(params.id);
  const { user } = await validateRequest();

  if (!data) {
    return notFound();
  }

  return <RecipeDetails data={data} user_id={user?.id as string} />;
}

export default Page;
