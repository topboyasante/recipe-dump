"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Loader from "@/components/ui/loader";
import { DeleteRecipe, GetRecipeByID } from "@/services/recipe";

type ModalProps = {
  recipe_id: string;
};

function DeleteRecipeModal({ recipe_id }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function deleteProduct() {
    const product = await GetRecipeByID(recipe_id);
    const formData = new FormData();
    formData.append("public_id", `${product?.image_public_id}`);

    try {
      setIsSubmitting(true);
      await fetch(`/api/destroy-image`, {
        method: "POST",
        body: formData,
      });
      DeleteRecipe(recipe_id).then(() => {
        setIsSubmitting(false);
        router.push("/recipes");
        toast(`The recipe was successfully deleted.`);
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error deleting product:", error);
    }
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={`secondary`} className="gap-3">
          <TrashIcon />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            recipe and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProduct}>
            {isSubmitting ? (
              <Loader width="20" height="20" color="white" />
            ) : (
              "Submit"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteRecipeModal;
