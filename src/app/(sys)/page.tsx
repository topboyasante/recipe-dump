import Search from "@/components/ui/search-bar";
import { GetAllRecipes } from "@/services/recipe";
import RecipeList from "./recipes/recipe-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RecipeDump",
  description: "Find and share everyday cooking inspiration.",
};

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const data = await GetAllRecipes(query);

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto mb-16">
        <div className="flex flex-col justify-center items-center w-full gap-5">
          <div className="md:text-center">
            <h2>RecipeDump</h2>
            <p className="text-neutral-500">
              Find and share everyday cooking inspiration on RecipeDump.
            </p>
          </div>
          <div className="w-full md:w-[50%]">
            <Search placeholder="Search for recipes" />
          </div>
        </div>
      </div>
      <RecipeList data={data} />
    </div>
  );
}

export default Page;
