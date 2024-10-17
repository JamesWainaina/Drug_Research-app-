"use client";
import Breadcrumb from "@/components/ComponentHeader/ComponentHeader";
import Image from "next/image";

import { CameraIcon } from "lucide-react";
import { useUser } from "../context/UserContext";
import DefaultLayout from "@/components/Layout/DefaultLayout";

const Profile = () => {
  const user = useUser();

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        {/* Breadcrumb for navigation */}
        <Breadcrumb pageName="Profile" containActionButton={false} />

        {/* Profile container */}
        <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* Profile header or background section (you can add a background image here if necessary) */}
          <div className="relative z-20 h-35 md:h-65"></div>

          {/* Profile content section */}
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            {/* Profile Picture */}
           <div className="relative z-30 mx-auto -mt-12 h-32 w-full max-w-32 rounded-full bg-white/20 p-2 backdrop-blur sm:h-36 sm:max-w-36 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={user.photo}
                  width={120}
                  height={120}
                  className="rounded-full"
                  alt="profile"
                />
                {/* Edit icon */}
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <CameraIcon size={22} />
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* User Information */}
            <div className="mt-12">
              {" "}
              {/* Increased top margin for more space */}
              <h3 className="mb-2 text-2xl font-semibold text-black dark:text-white">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Drug Researcher
              </p>
              {/* Stats (Contributions) */}
              <div className="mx-auto mb-5 mt-6 grid w-max grid-cols-1 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    259
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Contributions
                  </span>
                </div>
              </div>
              {/* About Section */}
              <div className="mx-auto mt-8 max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  About Me
                </h4>
                <p className="text-gray-700 dark:text-gray-400 mt-4">
                  {user.userBio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
