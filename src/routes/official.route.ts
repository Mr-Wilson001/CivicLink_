import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getOfficialProfile, updateOfficialProfile } from "../controllers/official.controller";

const router = Router();

router.get("/profile", authenticate, getOfficialProfile);
router.patch("/uProfile", authenticate, updateOfficialProfile);

export default router;
