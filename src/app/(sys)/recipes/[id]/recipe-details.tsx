import BackButton from "@/components/ui/back-button";
import Image from "next/image";
import React from "react";
import DeleteRecipeModal from "./delete-recipe";
import { formatDate } from "@/utils";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  id: string;
  title: string;
  content: string;
  img_url: string;
  image_public_id: string;
  author_id: string;
  created_at: Date;
  user_id: string;
  created_at_username: string;
};

function RecipeDetails({ ...props }: Props) {
  const createdByUser = props.author_id === props.user_id;
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="mb-8">
        <BackButton />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h3>{props.title}</h3>
          {createdByUser && <DeleteRecipeModal recipe_id={props.id} />}
        </div>
        <div>
          <p>{formatDate(props.created_at)}</p>
          <p>
            Created by {createdByUser ? "you" : `${props.created_at_username}`}
          </p>
        </div>
        <br />
        <Image
          src={props.img_url as string}
          alt={props.title as string}
          width={800}
          height={800}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>
      <br />
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.content as string),
          }}
        ></div>
      </div>
    </div>
  );
}

export default RecipeDetails;
