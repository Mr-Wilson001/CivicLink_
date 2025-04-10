import { Router } from "express";
import { searchOfficials } from "../controllers/search.controller";

const router = Router();

router.get("/officials", searchOfficials);

export default router;