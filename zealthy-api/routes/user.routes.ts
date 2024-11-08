import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post("/createUser", UserController.create);
router.patch("/email/:email", UserController.update);
router.get("/", UserController.getAll);
router.get("/email/:email", UserController.getByEmail);

export default router;
