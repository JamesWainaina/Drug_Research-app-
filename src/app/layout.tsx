"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect } from "react";
import { UserProvider } from "./context/UserContext";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import {AblyProvider, ChannelProvider} from "ably/react";
import Ably from 'ably';
import useColorMode from "@/hook/useColorMode";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new Ably.Realtime({
    key: "86p3gA.G0T1ZA:oKduisIq-z3HV5_9lIzCFLE4Dx4ABk4l2SMVtv1a3TM",
  });

  const [ colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    // apply the dark or light class to the body
    if (colorMode === "dark") {
      document.body.classList.add("dark");
    }else {
      document.body.classList.remove("dark");
    }
  }, [colorMode]);
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
          <UserProvider>
            <AblyProvider client={client}>
              <ChannelProvider channelName="chat-demo">
                {children}
                </ChannelProvider>
            </AblyProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
