"use client";
import React, { useTransition } from "react";
import { signup } from "../login/actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleClickCreateAccountButton = (formData: FormData) => {
    startTransition(async () => {
      const errorMessage = await signup(formData);
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        router.push("/emailconfirmation");
      }
    });
  };
  return (
    <form className="max-w-xs mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          disabled={isPending}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          disabled={isPending}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          formAction={handleClickCreateAccountButton}
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[30px] focus:outline-none focus:shadow-outline"
        >
          {isPending ? <Loader2 /> : "signup"}
        </button>

        <p>
          {" "}
          allready have account{" "}
          <span
            onClick={() => {
              router.push("/login");
            }}
            className="text-emerald-600"
          >
            login
          </span>
        </p>
      </div>
    </form>
  );
}
