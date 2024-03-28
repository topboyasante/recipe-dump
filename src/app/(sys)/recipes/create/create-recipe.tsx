"use client";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import TipTap from "@/components/ui/tiptap";
import { CreateRecipe } from "@/services/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "This is a required field.",
  }),
  content: z.string().min(1, {
    message: "This is a required field.",
  }),
});

type FormProps = {
  author_id: string;
};

function CreateRecipeForm({ ...props }: FormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    if (!selectedFile) {
      toast("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch(`/api/upload-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image.");
    }

    const { results } = await response.json();
    const imageUrl = results.secure_url;
    const image_public_id = results.public_id;

    // Once the image is uploaded, you can proceed to create the product
    const payload = {
      ...values,
      author_id: props.author_id,
      img_url: imageUrl,
      image_public_id,
    };

    CreateRecipe(payload)
      .then(() => {
        setIsSubmittingForm(false);
        router.push("/");
        toast("Recipe created");
      })
      .catch((err) => {
        toast(`${err}`);
        setIsSubmittingForm(false);
      });
  }

  function UploadImageToForm(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result;
        if (typeof dataURL === "string") {
          setPreview(dataURL);
        }
      };

      reader.readAsDataURL(file as File);
    } else {
      return;
    }
  }

  return (
    <div className="w-full h-full py-8">
      <div className="mb-8">
        <BackButton />
      </div>
      <div>
        <h2>Add A Recipe</h2>
      </div>
      <br />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm">Cover Image</p>
          <section className="my-5 border p-3 rounded">
            <section>
              {preview ? (
                <Image
                  src={preview}
                  alt="preview_image"
                  width={1000}
                  height={1000}
                />
              ) : (
                <div></div>
              )}
            </section>
            <label
              htmlFor="imageUpload"
              className="h-9 w-auto gap-2 flex flex-row items-center justify-center text-sm rounded-[4px] hover:cursor-pointer"
            >
              <div className="">
                <ImageDown />
              </div>
              <span>Choose Image</span>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => UploadImageToForm(e)}
              className="hidden relative h-[0.1px] -z-50"
            />
          </section>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe</FormLabel>
                <FormControl>
                  <TipTap onChange={field.onChange} />
                  {/* <RTEditor onChange={field.onChange}/> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmittingForm}>
            {isSubmittingForm ? (
              <Loader width="20" height="20" color="white" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateRecipeForm;
