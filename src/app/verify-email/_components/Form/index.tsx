"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { schema } from "./schema";
import type { FormFields, VerifyEmailFormProps } from "./types";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle } from "~/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";

export default function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const router = useRouter();
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
    },
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
          <Alert variant="destructive">
            <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
          </Alert>
        )}
        <InputOTP
          maxLength={8}
          onComplete={(value) => form.setValue("otp", value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={5} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={6} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
        <div>
          <Button type="submit" className="w-full">
            VERIFY
          </Button>
        </div>
      </form>
    </Form>
  );
}
