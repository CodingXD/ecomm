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
import { Alert, AlertTitle } from "~/components/ui/alert";

export default function VerifyEmailForm() {
  const router = useRouter();
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const verifyOtp = api.auth.verifyOtp.useMutation();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const response = await verifyOtp.mutateAsync(data);
    if (!response.success) {
      form.setError("root", { message: response.errorMessage });
    } else {
      router.push("/");
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
          <Alert>
            <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="otp"
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
        <div>
          <Button type="submit" className="w-full">
            VERIFY
          </Button>
        </div>
      </form>
    </Form>
  );
}
