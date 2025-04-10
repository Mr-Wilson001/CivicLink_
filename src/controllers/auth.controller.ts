import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Citizen } from "../models/citizens";
import { Official } from "../models/officials";


const JWT_SECRET = process.env.JWT_SECRET!;


export const registerCitizen = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Request Body:", req.body); // Debug log

    const { fullName, email, password, stateOfOrigin, phone } = req.body;

    const existingUser = await Citizen.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Citizen already registered." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const citizen = await Citizen.create({ fullName, email, password: hashedPassword, stateOfOrigin, phone });

    const token = jwt.sign({ id: citizen._id, role: "citizen" }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : "An unknown error occurred" });
  }
};

export const loginCitizen = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const citizen = await Citizen.findOne({ email });

    if (!citizen) {
      res.status(404).json({ message: "Citizen not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, citizen.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: citizen._id, role: "citizen" }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, citizenId: citizen._id }); // Include citizenId in the response
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
  }
};

export const getCitizenProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; // Ensure `user` is properly typed in your middleware
    const citizen = await Citizen.findById(user.id).select("-password");

    if (!citizen) {
      res.status(404).json({ message: "Citizen not found" });
      return;
    }

    res.status(200).json(citizen); // The response will include the _id field
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
  }
};

export const registerOfficial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, position, stateOfOrigin, phone } = req.body;

    // Check if the official already exists
    const existingOfficial = await Official.findOne({ email });
    if (existingOfficial) {
      res.status(400).json({ message: "Official already registered." });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the official
    const official = await Official.create({ fullName, email, position, stateOfOrigin, phone, password: hashedPassword });

    // Generate a token for the official
    const token = jwt.sign({ id: official._id, role: "official" }, JWT_SECRET, { expiresIn: "1h" });

    // Respond with the token
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : "An unknown error occurred" });
  }
};

export const loginOfficial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const official = await Official.findOne({ email });

    if (!official) {
      res.status(404).json({ message: "Official not found" });
      return;
    }

    if (!official.password) {
      res.status(400).json({ message: "Password is missing for the official" });
      return;
    }

    const isMatch = await bcrypt.compare(password, official.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate a token with a 1-hour expiration
    const token = jwt.sign({ id: official._id, role: "official" }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : "An unknown error occurred" });
  }
};


