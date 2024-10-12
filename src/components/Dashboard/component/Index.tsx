'use client';

import dynamic from "next/dynamic";
import React from "react";
import CTACard from "./CTACard";
import { AtomIcon, MessageCircle, Network, Search, SearchIcon } from "lucide-react";
import exp from "constants";

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
                <CTACard subtitle="get access to more molecules" title="Molecule Bank">
                    <AtomIcon />
                </CTACard>
                <CTACard
                subtitle="get access to more molecules"
                title="Generate Molecule">
                    <Network/>
                </CTACard>
                <CTACard
                subtitle="get access to more molecules"
                title="Search Compounds">
                    <SearchIcon/>
                </CTACard>
                <CTACard
                subtitle="get access to more molecules"
                title="Collaborative Research">
                    <MessageCircle/>
                </CTACard>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <DashboardCardChat/>
                <DashboardCardMap/>
            </div>
        </>
    );
}

export default Index;