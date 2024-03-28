"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

function BackButton() {
  const router = useRouter();
  return (
    <Button size={`icon`} variant={`ghost`} onClick={() => router.back()} className="border">
      <ChevronLeftIcon />
    </Button>
  );
}

export default BackButton;
