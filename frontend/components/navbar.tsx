"use client";

import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const navItems = isAuthenticated
    ? [
        { href: "/", label: "Home" },
        { href: "/sell", label: "Sell" },
        { href: "/my-listings", label: "My Listings" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/sell", label: "Sell" },
      ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
        >
          ScrapShift
        </Link>

        <nav className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50/90 p-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                pathname === item.href
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Register
              </Link>
              <Link
                href="/sell"
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sell your car
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/my-listings"
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                My Listings
              </Link>
              <Link
                href="/sell"
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sell your car
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
