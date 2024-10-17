'use client';

import { useState } from "react";
import { ChevronDown, LogOut, Settings, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { signOut } from "next-auth/react";

const DropDownUser = () => {
    const [dropDownOpen, setDropdownOpen] = useState(false);

    const router = useRouter();
    const user = useUser();
    const handleLogout = async () => {
        await signOut({redirect:false})
        router.push("/auth-page/signin")
    };
    return (
        <div>
            <Link
            onClick={() => setDropdownOpen(!dropDownOpen)}
            href={'#'}
            className="flex items-center gap-4">
             <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-black dark:text-white">
                    {user.firstName} {user.lastName}
                </span>
                <span className="block text-xs">
                    researcher
                </span>
             </span>
             <span className="h-11 w-11 rounded-full">
                <Image
                width={80}
                height={80}
                src={user.photo}
                alt="user"
                style={{
                    width: "auto",
                    height: "auto",
                }}
                />
             </span>
             <ChevronDown/>
            </Link>

            {dropDownOpen && (
                <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-lg
                border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 
                    py-7.5 dark:border-strokedark">
                        <li>
                            <Link
                            href="/profile"
                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out
                            hover:text-primary lg:text-base">
                                <User2/>
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                            href='/settings'
                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out
                            hover:text-primary lg:text-base">
                            <Settings/>
                            Account settings
                            </Link>
                        </li>
                    </ul>
                    <button
                    className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out
                     hover:text-primary lg:text-base" onClick={handleLogout}>
                        <LogOut/>
                        LogOut
                        </button>
                </div>
            )}
        </div>
    )
}

export default DropDownUser;

