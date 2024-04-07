import Link from "next/link";
import Form from "./_components/Form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Login to your account",
};

export default function Login() {
  return (
    <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="divide-y-2 bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div>
          <h1 className="text-center text-4xl font-semibold leading-9 tracking-tight text-gray-900">
            Login
          </h1>
          <h2 className="mt-6 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
            Welcome back to ECOMMERCE
          </h2>
          <p className="mb-10 text-center text-base">
            The next gen business marketplace
          </p>
          <Form />
        </div>
        <p className="mt-10 pt-5 text-center text-sm text-gray-500">
          Don&apos;t have an Account?{" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
          >
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
}
