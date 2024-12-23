"use client";

import { useEffect, useState } from "react";
import MoleculeStructure from "../MoleculeStructure";

const moleculeBank = [
  {
    moleculeName: "Aspirin",
    smilesStructure: "CC(=O)OC1=CC=CC=C1C(O)=O",
    molecularWeight: 180.16,
    categoryUsage: "Pain reliever/NSAID",
  },
  {
    moleculeName: "Caffeine",
    smilesStructure: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
    molecularWeight: 194.19,
    categoryUsage: "Stimulant",
  },
  {
    moleculeName: "Benzene",
    smilesStructure: "C1=CC=CC=C1",
    molecularWeight: 78.11,
    categoryUsage: "Industrial solvent",
  },
  {
    moleculeName: "Glucose",
    smilesStructure: "C(C1C(C(C(C(O1)O)O)O)O)O",
    molecularWeight: 180.16,
    categoryUsage: "Energy source/sugar",
  },
  {
    moleculeName: "Penicillin",
    smilesStructure: "CC1(C2C(C(C(O2)N1C(=O)COC(=O)C)C)S)C=O",
    molecularWeight: 334.39,
    categoryUsage: "Antibiotic",
  },
  {
    moleculeName: "Ibuprofen",
    smilesStructure: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    molecularWeight: 206.28,
    categoryUsage: "Pain reliever/NSAID",
  },
  {
    moleculeName: "Acetaminophen",
    smilesStructure: "CC(=O)NC1=CC=C(O)C=C1",
    molecularWeight: 151.16,
    categoryUsage: "Pain reliever/Antipyretic",
  },
  {
    moleculeName: "Morphine",
    smilesStructure: "CN1CCC23C4C1CC(C2C3O)OC5=CC=CC=C45",
    molecularWeight: 285.34,
    categoryUsage: "Pain reliever/Opiate",
  },
  {
    moleculeName: "Nicotine",
    smilesStructure: "CN1CCCC1C2=CN=CC=C2",
    molecularWeight: 162.23,
    categoryUsage: "Stimulant",
  },
  {
    moleculeName: "Ethanol",
    smilesStructure: "CCO",
    molecularWeight: 46.07,
    categoryUsage: "Alcohol/Disinfectant",
  },
  {
    moleculeName: "Cholesterol",
    smilesStructure: "CC(C)CC(C)C(C)CC(C)C1=CC(C(C)C)=CC(C)C1(C)C",
    molecularWeight: 386.65,
    categoryUsage: "Biomolecule/Cell membrane component",
  },
  {
    moleculeName: "Sodium Chloride",
    smilesStructure: "[Na+].[Cl-]",
    molecularWeight: 58.44,
    categoryUsage: "Electrolyte",
  },
  {
    moleculeName: "Vitamin C (Ascorbic Acid)",
    smilesStructure: "C(C(C(=O)O)O)C(=O)O",
    molecularWeight: 176.12,
    categoryUsage: "Vitamin/Antioxidant",
  },
  {
    moleculeName: "Serotonin",
    smilesStructure: "C1=CC(C(C(=C1)O)N)C(=O)C=C(C(=C)N)C=CC(=C)C",
    molecularWeight: 176.24,
    categoryUsage: "Neurotransmitter",
  },
  {
    moleculeName: "Folic Acid (Vitamin B9)",
    smilesStructure:
      "C(C(=O)O)C1=NC2=C(N1C(=O)C(N2C(=O)O)C(C)C(=C)C(=O)C1(C)=C2)",
    molecularWeight: 441.4,
    categoryUsage: "Vitamin/Essential for DNA synthesis",
  },
  {
    moleculeName: "Lactose",
    smilesStructure: "C(C1C(C(C(C(O1)O)O)O)O)O",
    molecularWeight: 342.3,
    categoryUsage: "Disaccharide/Sugar",
  },
  {
    moleculeName: "Citric Acid",
    smilesStructure: "C(C(=O)O)C(C(=O)O)(C(C(=O)O)C(C(=O)O)C(=O)O)C(=O)O",
    molecularWeight: 192.13,
    categoryUsage: "Acidic flavoring agent in food",
  },
  {
    moleculeName: "Tryptophan",
    smilesStructure: "CC(C(=O)O)C(C1=C(C=C(C=C1)C(=O)O)C)N",
    molecularWeight: 204.23,
    categoryUsage: "Amino acid/Precursor to serotonin",
  },
  {
    moleculeName: "Acetic Acid",
    smilesStructure: "CC(=O)O",
    molecularWeight: 60.05,
    categoryUsage: "Organic acid/Flavoring agent",
  },
  {
    moleculeName: "Thymine",
    smilesStructure: "CC1=C(N=C(N1)C(=O)C)C(=O)C",
    molecularWeight: 126.11,
    categoryUsage: "Nucleotide base",
  },
];

const MoleculeBankTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMolecules, setFilteredMolecules] = useState(moleculeBank);

  useEffect(() => {
    const filteredData = moleculeBank.filter((molecule) =>
      molecule.moleculeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredMolecules(filteredData);
  }, [searchQuery]);

  return (
    <div
      className="sm-px-7.5 rounded-lg border border-stroke bg-white px-5 pb-2.5 pt-5
        shadow-default dark:border-[#181818] dark:bg-[#181818] xl:pb-1"
    >
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Molecules
      </h4>
      <input
        type="search"
        placeholder="Search molecule"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-gray-300 text-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-md mb-4  w-full
            rounded-lg border bg-white px-4 py-3 shadow-sm outline-none focus:border-primary focus:ring-primary
            dark:bg-[#181818] dark:text-white"
      />
      <div className="flex flex-col">
        <div className="grid-col-3 grid rounded-lg bg-gray-2 dark:bg-[#121212] sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <div className="text-sm font-medium uppercase xsm:text-base">
              Molecule name
            </div>
          </div>
          <div className="p-25 text-center xl:p-5">
            <h5 className="uppercade text-sm font-medium xsm:text-base">
              Smile Structure Image
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Molecular Weights (g/mol)
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category Usage
            </h5>
          </div>
        </div>
        {filteredMolecules.map((molecule, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === filteredMolecules.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {molecule.moleculeName}
              </p>
            </div>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <MoleculeStructure
                  id={`${key}`}
                  structure={molecule.smilesStructure}
                />
              </div>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {molecule.molecularWeight}
              </p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="dark:text-white` text-black">
                {molecule.categoryUsage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoleculeBankTable;
