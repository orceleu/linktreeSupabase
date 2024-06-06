import React from "react";
import { login, signup } from "./actions";

export default function LoginPage() {
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
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          formAction={login}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[30px] focus:outline-none focus:shadow-outline"
        >
          Log In
        </button>
        <button
          formAction={signup}
          className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-[30px] focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
