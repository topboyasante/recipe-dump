import { Button } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Cross1Icon className="w-[4rem] text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested page.</p>
      <Link href="/">
        <Button variant={`link`}>Go Home</Button>
      </Link>
    </main>
  );
}
