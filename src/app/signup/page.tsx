import Link from "next/link";
import Form from "./_components/Form";

export default function Signup() {
  return (
    <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="divide-y-2 bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div>
          <h1 className="mb-10 text-center text-4xl font-semibold leading-9 tracking-tight text-gray-900">
            Create your account
          </h1>
          <Form />
        </div>
        <p className="mt-10 pt-5 text-center text-sm text-gray-500">
          Have an Account?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
          >
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}
