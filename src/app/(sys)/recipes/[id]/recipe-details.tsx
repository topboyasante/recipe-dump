import BackButton from "@/components/ui/back-button";
import Image from "next/image";
import React from "react";
import DeleteRecipeModal from "./delete-recipe";
import { formatDate } from "@/utils";

type Props = {
  data: {
    id: string;
    title: string;
    content: string;
    img_url: string;
    image_public_id: string;
    author_id: string;
    created_at: Date;
  };
  user_id: string;
};

function RecipeDetails({ data, user_id }: Props) {
  const createdByUser = data.author_id === user_id;
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="mb-8">
        <BackButton />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h3>{data.title}</h3>
          {createdByUser && <DeleteRecipeModal recipe_id={data.id}/>}
        </div>
        <div>
          <p>{formatDate(data.created_at)}</p>
        </div>
        <br />
        <Image
          src={data.img_url as string}
          alt={data.title as string}
          width={800}
          height={800}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>
      <br />
      <div>
        <div dangerouslySetInnerHTML={{ __html: data.content as string }}></div>
      </div>
    </div>
  );
}

export default RecipeDetails;
