"use client";

import dynamic from "next/dynamic";
import React from "react";
import CTACard from "./CTACard";
import { AtomIcon, MessageCircle, Network, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

const DashboardCardMap = dynamic(
  () => import("@/components/Dashboard/component/DashboardCardMap"),
  {
    ssr: false,
  },
);

const DashboardCardChat = dynamic(
  () => import("@/components/Dashboard/component/DashboardCardChart"),
  {
    ssr: false,
  },
);

const Index: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CTACard
          subtitle="Get access to more molecules"
          title="Molecule Bank"
          onClick={() => handleNavigate("/molecule-bank")}
        >
          <AtomIcon />
        </CTACard>
        <CTACard
          subtitle="Generate molecules"
          title="Generate Molecule"
          onClick={() => handleNavigate("/model")} 
        >
          <Network />
        </CTACard>
        <CTACard
          subtitle="Search compounds"
          title="Search Compounds"
          onClick={() => handleNavigate("/research")} 
        >
          <SearchIcon />
        </CTACard>
        <CTACard
          subtitle="Collaborative research"
          title="Collaborative Research"
          onClick={() => handleNavigate("/message")}
        >
          <MessageCircle />
        </CTACard>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <DashboardCardChat />
        <DashboardCardMap />
      </div>
    </>
  );
};

export default Index;
