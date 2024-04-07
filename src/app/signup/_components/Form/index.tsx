"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { schema } from "./schema";
import type { FormFields } from "./types";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import useUserStore from "~/store/user";
import { Alert, AlertTitle } from "~/components/ui/alert";

export default function SignupForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const signup = api.auth.signup.useMutation();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const response = await signup.mutateAsync(data);
    if (!response.success) {
      form.setError("root", { message: response.errorMessage });
    } else {
      setUser(response.data!);
      router.push(`/verify-email?email=${data.email}`);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {form.formState.errors.root?.message && (
          <Alert variant="destructive">
            <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter" {...field} autoComplete="name" />
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
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter"
                  {...field}
                  autoComplete="email"
                  type="email"
                />
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
                <Input
                  placeholder="Enter"
                  {...field}
                  autoComplete="new-password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting || form.formState.isSubmitSuccessful
              ? "PLEASE WAIT"
              : "CREATE ACCOUNT"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
