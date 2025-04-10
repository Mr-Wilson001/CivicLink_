import { Schema, model } from 'mongoose';

const officialSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  position: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  stateOfOrigin: { type: String, required: true }
}, { timestamps: true });



export const Official = model('Official', officialSchema);