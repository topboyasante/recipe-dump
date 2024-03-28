import RecipeCard from "@/components/cards/recipe-card";
import { GetLoggedInUser } from "@/services/auth";
import { formatDate } from "@/utils";
import Avatar from "boring-avatars";
import { notFound } from "next/navigation";
import React from "react";

async function Page() {
  const data = await GetLoggedInUser();

  if (!data) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex gap-5 items-center">
          <Avatar
            size={50}
            name={data.username}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <div>
            <h3>{data.username}</h3>
            <p className="text-neutral-500">
              Joined {formatDate(data.created_at)}
            </p>
          </div>
        </div>
        <br />
        <div>
          <div className="mb-5">
            <h5>Recipes</h5>
          </div>
          {data.account?.recipes.length === 0 ? (
            <div>
              <h3 className="text-center">No data to display.</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.account?.recipes.map((item) => {
                return (
                  <RecipeCard
                    img_url={item.img_url}
                    title={item.title}
                    recipe_id={item.id}
                    key={item.id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
