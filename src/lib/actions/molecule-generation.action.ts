"use server";


import MoleculeGenerationHistory from "../database/models/molecule-generation.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import mongoose from "mongoose";

export async function createMoleculeGenerationHistory(
  payload: MoleculeGenerationHistoryType,
  userId: string,
) {
  try {
    await connectToDatabase();

    const newHistoryEntry = await MoleculeGenerationHistory.create({
      ...payload,
      user: new mongoose.Types.ObjectId(userId),
    });

    return JSON.parse(JSON.stringify(newHistoryEntry));
  } catch (error) {
    console.error("Error creating history entry:", error);
    handleError(error);
  }
}

export async function getMoleculeGenerationHistoryByUser(userId: string) {
  try {
    await connectToDatabase();

    const historyEntries = await MoleculeGenerationHistory.find({
      user: userId,
    }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(historyEntries));
  } catch (error) {
    console.error("Error retrieving history entries:", error);
    handleError(error);
  }
}

export async function getMoleculeGenerationHistoryById(historyId: string) {
  try {
    await connectToDatabase();

    const historyEntry = await MoleculeGenerationHistory.findById(historyId);
    if (!historyEntry) throw new Error("History entry not found");

    return JSON.parse(JSON.stringify(historyEntry));
  } catch (error) {
    console.error("Error retrieving history entry by ID:", error);
    handleError(error);
  }
}

export async function deleteMoleculeGenerationHistory(entryId: string) {
  try {
    await connectToDatabase();

    const deletedEntry =
      await MoleculeGenerationHistory.findByIdAndDelete(entryId);

    return JSON.parse(JSON.stringify(deletedEntry));
  } catch (error) {
    console.error("Error deleting history entry:", error);
    handleError(error);
  }
}


// src/lib/actions/molecule-api.action.js

export async function fetchMolecules(payload: { algorithm: string; num_molecules: number; property_name: string; minimize: boolean; min_similarity: number; particles: number; iterations: number; smi: string; }) {
  const API_KEY = "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";
  const invokeUrl = "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";

  try {
    const response = await fetch(invokeUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return JSON.parse(data.molecules).map((mol: { sample: any; score: any; }) => ({
      structure: mol.sample,
      score: mol.score,
    }));
  } catch (error) {
    console.error("Error fetching data from NVIDIA API:", error);
    throw error; // Let the caller handle the error
  }
}
