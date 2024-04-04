import Link from "next/link";
import Form from "./_components/Form";

export default function Signup() {
  return (
    <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="divide-y-2 bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div>
          <h1 className="text-center text-4xl font-semibold leading-9 tracking-tight text-gray-900">
            Verify your email
          </h1>
          <p className="mb-10 text-center text-base">
            Enter the 8 digit code you have received on anu***@gmail.com
          </p>
          <Form />
        </div>
      </div>
    </div>
  );
}
