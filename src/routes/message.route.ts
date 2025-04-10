import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { sendMessage, getMessages } from "../controllers/message.controller";

const router = Router();

router.post("/", authenticate, sendMessage);
router.get("/", authenticate, getMessages);

export default router;
