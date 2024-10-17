"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import { UserProvider } from "./context/UserContext";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Placing the script inside the <head> */}
        <script
          src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"
          async
        ></script>
      </Head>
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          <UserProvider>{children}</UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
