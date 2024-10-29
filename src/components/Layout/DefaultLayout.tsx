'use client'
import React, {useLayoutEffect, useState} from 'react'
import SideBar from '../Sidebar/Index'
import Header from '../Header/Index';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


export default function DefaultLayout({
    children, 
}:{ 
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // hook to check if the user has logged in for page Protection
    const {data: session, status} = useSession();

    const router = useRouter();
    const pathName = usePathname();

    const publicRoutes = [
      "/auth-page/signin",
      "/auth-page/signup",
      "/verify-email",
      "/reset-password",
      "/forget-password"
    ]

    useLayoutEffect(() => {
      if (status === "unauthenticated" && !publicRoutes.includes(pathName))
        router.push("/auth-page/signin")
    },[status, router,pathName])
    
    return (
      <div className="flex">
        {/* Sidebar */}
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* headers */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div
              className="mx-auto max-w-screen-2xl p-4 dark:bg-[#121212]
                     md:p-6 2xl:p-10"
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    );
}