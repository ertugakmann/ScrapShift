import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Navbar } from "@/components/navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "ScrapShift Cars",
  description: "Cheap used car marketplace under £5000"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
