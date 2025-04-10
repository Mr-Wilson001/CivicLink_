import { Router } from "express";
import { registerCitizen, loginCitizen, registerOfficial, getCitizenProfile } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { loginOfficial } from "../controllers/auth.controller";
import { registerCitizenValidationRules, validateRequest } from "../validators/registerValidator";

const router = Router();

router.post("/register", registerCitizenValidationRules, validateRequest, registerCitizen);
router.post("/login", loginCitizen);
router.get("/profile", authenticate, getCitizenProfile);
router.post("/official/register", registerOfficial);
router.post("/official/login", loginOfficial);

export default router;