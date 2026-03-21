"use client";

import Link from "next/link";

import { InputField } from "@/components/ui/input-field";
import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      setError("");
      await register(email, password, username, phone_number);
      router.push("/login");
    } catch (err: any) {
      console.log(err.response?.data?.detail);
      if (err.response?.data?.detail === "Username is already taken") {
        setError("Username is already taken");
      } else if (
        err.response?.data?.detail ===
        "An account with this email already exists"
      ) {
        setError("An account with this email already exists");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:h-[calc(100vh-104px)] md:min-h-[calc(100vh-104px)]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <section className="order-1 flex h-full flex-col md:order-2">
            <div className="flex h-full w-full items-center justify-center">
              <form className="w-full max-w-md space-y-5 rounded-xl bg-white p-6 shadow-lg sm:p-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Create your account
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    Register to post and manage your car listings.
                  </p>
                </div>

                <div className="space-y-4">
                  <InputField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputField
                    id="username"
                    label="Username"
                    placeholder="carhunter95"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <InputField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputField
                    id="phone"
                    label="Phone"
                    type="tel"
                    placeholder="07..."
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                  onClick={handleRegister}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>

                {error && <p className="text-red-500 font-semibold">{error}</p>}

                <p className="text-sm text-slate-600">
                  Already registered?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </section>

          <aside className="order-2 flex h-full flex-col rounded-2xl border border-blue-100/60 bg-gradient-to-br from-blue-50 via-white to-white p-6 shadow-sm md:order-1 md:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                S
              </div>
              <div className="text-xl font-bold tracking-tight text-slate-900">
                ScrapShift
              </div>
            </div>

            <div className="mt-6 flex flex-1 flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Find your next car for less
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Browse affordable listings, compare options, and connect with
                sellers instantly.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700">
                    ✓
                  </span>
                  <span>Browse thousands of cheap cars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700">
                    ✓
                  </span>
                  <span>List your car in minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700">
                    ✓
                  </span>
                  <span>No hidden fees</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
