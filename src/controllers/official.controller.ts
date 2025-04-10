import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Citizen } from "../models/citizens";
import { Official } from "../models/officials";



export const getOfficialProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user; // Ensure `user` is properly typed in your middleware
      const official = await Official.findById(user.id).select("-password"); // Exclude the password field
  
      if (!official) {
        res.status(404).json({ message: "Official not found" });
        return;
      }
  
      res.status(200).json(official); // The `position` field will be included by default
    } catch (err) {
      res.status(500).json({ error: (err instanceof Error) ? err.message : "An unknown error occurred" });
    }
  };

export const updateOfficialProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; // Ensure `user` is properly typed in your middleware
    const updates = req.body;

    const official = await Official.findByIdAndUpdate(user.id, updates, { new: true });
    if (!official) {
      res.status(404).json({ message: "Official not found" });
      return;
    }

    res.status(200).json(official);
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : "An unknown error occurred" });
  }
};
