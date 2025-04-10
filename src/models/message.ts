import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, required: true, refPath: 'senderModel' },
  receiverId: { type: Schema.Types.ObjectId, required: true, refPath: 'receiverModel' },
  senderModel: { type: String, required: true, enum: ['Citizen', 'Official'] },
  receiverModel: { type: String, required: true, enum: ['Citizen', 'Official'] },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const Message = model("Message", messageSchema);