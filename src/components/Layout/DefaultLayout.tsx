'use client'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import SideBar from '../Sidebar/Index'


export default function DefaultLayout({
    children, 
}:{ 
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <div className="relative flex flex-1 flex-col lg:ml-72.5">
                {/* headers */}

                <main>
                    <div className='mx-auto max-w-screen-2xl p-4 dark:bg-[#121212]
                     md:p-6 2xl:p-10'>
                            {children}
                    </div>
                </main>

            </div>
        </div>
    )
}