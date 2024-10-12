import Index from "@/components/Dashboard/component/Index";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Protein Bind: a leading research platform fpr drug research",
  description:" this is a description for protein bind"
}


export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Index/>
      </DefaultLayout>
      
    </>
  );
}
