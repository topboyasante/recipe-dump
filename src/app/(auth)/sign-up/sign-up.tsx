"use client";
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
import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { CreateUser } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "This is a required field.",
  }),
  email: z.string().email({
    message: "This is a required field.",
  }),
  password: z.string().min(1, {
    message: "This is a required field.",
  }),
});

function SignUpForm() {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    CreateUser(values)
      .then(() => {
        setIsSubmittingForm(false);
        toast(`Your Account has been created. Welcome to RecipeDump!`);
        router.push("/");
      })
      .catch((err) => {
        toast(`Something went wrong. Please try again.`);
        setIsSubmittingForm(false);
      });
  }

  return (
    <div className="w-screen h-auto">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:10px_10px] "></div>
      <div className="flex justify-center items-center h-full max-w-lg mx-auto p-5">
        <div className="w-full p-5">
          <div className="mb-5">
            <Logo />
          </div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Welcome to RecipeDump.
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            Already have an account?{" "}
            <span className="font-semibold text-black dark:text-white">
              <Link href={`/sign-in`}>Sign In</Link>
            </span>
          </p>
          <br />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isSubmittingForm ? (
                  <Loader width="20" height="20" color="white" />
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Separator />
              <p className="text-sm dark:text-neutral-600">
                By signing up, you agree to the{" "}
                <span className="underline">Terms of Service</span> and{" "}
                <span className="underline">Privacy Policy</span>.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
