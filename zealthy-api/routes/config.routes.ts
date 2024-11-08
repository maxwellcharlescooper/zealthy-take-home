import { Router } from "express";
import { ConfigController } from "../controllers/config.controller";

const router = Router();

router.get("/", ConfigController.get);
router.post("/", ConfigController.create);

export default router;
