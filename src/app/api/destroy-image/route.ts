import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const public_id = formData.get("public_id") as string;

  const res = await cloudinary.uploader
    .destroy(`${public_id}`)
    .then((res) => res)
    .catch((err) => {
      console.log("Delete Error", err);
    });

  return NextResponse.json({ res }, { status: 200 });
}
