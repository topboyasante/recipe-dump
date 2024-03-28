"use client";
import RecipeCard from "@/components/cards/recipe-card";
import { HomeIcon, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  data: {
    id: string;
    title: string;
    content: string;
    img_url: string;
    image_public_id: string;
    author_id: string;
    created_at: Date;
  }[];
};

function Home({ ...props }: Props) {
  const pathname = usePathname();
  return (
    <div>
      <div>
        {props.data.length === 0 ? (
          <div>
            <h3 className="text-center">No data to display.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {props.data.map((item) => {
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
      <Link href={pathname === "/" ? `/recipes/create` : `/`}>
        <div className="fixed bottom-5 right-0 m-8 bg-secondary rounded-full p-3 my-2">
          {pathname === "/" ? <Plus size={30} /> : <HomeIcon size={30} />}
        </div>
      </Link>
    </div>
  );
}

export default Home;
