import { z } from "zod";
import Form from "./_components/Form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

export default function Signup({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const schema = z
    .string({ required_error: "Email is missing" })
    .min(1, "Email is missing")
    .email("Invalid email address");
  const validator = schema.safeParse(searchParams.email);

  return (
    <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="divide-y-2 bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div>
          <h1 className="mb-2 text-center text-4xl font-semibold leading-9 tracking-tight text-gray-900">
            Verify your email
          </h1>
          <p className="mb-10 text-center text-base">
            Enter the 8 digit code you have received on anu***@gmail.com
          </p>
          {validator.success ? (
            <Form email={validator.data} />
          ) : (
            <div className="text-center">
              <small className="text-red-500">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {JSON.parse(validator.error.message)[0].message}
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
