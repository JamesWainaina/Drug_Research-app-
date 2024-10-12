'use client';

import dynamic from "next/dynamic";
import React from "react";

const DashboardCardMap = dynamic(
    () => import("@/components/Dashboard/component/DashboardCardMap"),
{
    ssr: false,
}
);

const DashboardCardChat = dynamic(
() => import("@/components/Dashboard/component/DashboardCardChart"),
{
    ssr: false,
},
);

const Index: React.FC = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-clos-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                CTACard
            </div>
        </>
    )
}