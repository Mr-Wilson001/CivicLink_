import { Request, Response } from "express";
import { Official } from "../models/officials";

export const searchOfficials = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position } = req.query;

    const query: any = {};

    // Add name to the query if provided
    if (name) query.name = { $regex: name, $options: "i" }; // Case-insensitive search

    // Add position to the query if provided
    if (position) query.position = { $regex: position, $options: "i" }; // Case-insensitive search

    // Search for officials matching the query
    const results = await Official.find(query).select("-password"); // Exclude the password field
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
  }
};