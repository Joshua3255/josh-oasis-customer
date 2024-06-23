"use client";
import Link from "next/link";
import { signInCredentialsAction } from "../_lib/actions";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

function SignInByCredential() {
  const [errorMessage, dispatch] = useFormState(
    signInCredentialsAction,
    undefined
  );

  return (
    <div className=" px-6">
      <form
        action={dispatch}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-4 flex-col"
      >
        <div className="grid grid-flow-row grid-cols-2 gap-3">
          <label>Email:</label>
          <input className="rounded px-2" type="email" name="email" />
          <label>Password:</label>
          <input className="rounded px-2" type="password" name="password" />
          {errorMessage && (
            <p className="text-red-600 col-span-2">{errorMessage}</p>
          )}

          <Link
            href="/signup"
            className=" text-center align-middle border border-primary-800 py-4 px-4 text-lg bg-stone-500 hover:bg-stone-700 "
          >
            Sign Up
          </Link>

          <SubmitButton pendingLabel="Verifying credentials">
            Login
          </SubmitButton>
        </div>
      </form>
      <div class="flex items-center justify-center space-x-4">
        <div class="w-1/4 border-t border-gray-300"></div>
        <span class="text-gray-500">or</span>
        <div class="w-1/4 border-t border-gray-300"></div>
      </div>
    </div>
  );
}

export default SignInByCredential;
