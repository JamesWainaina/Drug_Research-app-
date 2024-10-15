"use client";

import ComponentHeader from "@/components/ComponentHeader/ComponentHeader";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { LoaderCircle, LockIcon, MailIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsloading(true);

    // Basic form validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsloading(false);
      return;
    }

    try {
      // use NextAuth to sign in
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        // Navigate to the dashboard or another page after successful login
        router.push("/");
      }
    } catch (error) {
      // handle unexpected errors
      setError("An unexpected error occurred. Please try again.");
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <DefaultLayout>
      <ComponentHeader pageName="Sign In" />
      <div className="dark-border-strokedark rounded-lg border border-stroke bg-white shadow-default dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="mx-auto w-full xl:w-4/6">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to ProteinBind
              </h2>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none
                       focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       required
                       disabled={isloading}
                    />
                    <span className="absolute right-4 top-4">
                        <MailIcon/>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5
                  block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6+ Characters, 1, Capital letter" 
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    disabled={isloading}/>
                    <span className="absolute right-4 top-4">
                      <LockIcon/>
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  <button type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  disabled={isloading}>
                    {isloading ? (
                      <span className="flex items-center justify-center">
                        <LoaderCircle className="mr-2 animate-spin"/> Signing in...
                      </span>
                    ): (
                      "Sign In"
                    )}
                  </button>
                </div>
                <div className="mt-6 text-center">
                    <p>
                      Don't have an account?{" "}
                      <Link
                       href="/auth-page/signup" className="text-primary">
                        Sign Up
                      </Link>
                    </p>
                    <p>
                      Forgot Password?{" "}
                      <Link href="/forget-password" className="text-primary">
                      Reset
                      </Link>
                    </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
