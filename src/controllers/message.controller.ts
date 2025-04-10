import { Request, Response } from "express";
import { Message } from "../models/message";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId, content, receiverModel } = req.body;
    const sender = (req as any).user;

    const message = await Message.create({
      senderId: sender.id,
      senderModel: sender.role === "official" ? "Official" : "Citizen",
      receiverId,
      receiverModel,
      content,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const messages = await Message.find({
      $or: [
        { senderId: user.id },
        { receiverId: user.id }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
