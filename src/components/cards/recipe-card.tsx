import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  recipe_id: string;
  img_url: string;
};

function RecipeCard({ ...props }: CardProps) {
  return (
    <Link href={`/recipes/${props.recipe_id}`} className="hover:underline">
      <Image
        src={props.img_url}
        alt={props.title}
        width={800}
        height={800}
        className="w-full h-[300px] object-cover"
      />
      <div className="w-full flex items-center">
        <h4>{props.title}</h4>
      </div>
    </Link>
  );
}

export default RecipeCard;
