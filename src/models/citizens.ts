import { Schema, model } from "mongoose";

const citizenSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stateOfOrigin: { type: String, required: true }
}, { timestamps: true });

export const Citizen = model("Citizen", citizenSchema);