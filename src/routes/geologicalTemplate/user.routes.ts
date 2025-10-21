import express from "express";
import { getUsers } from "../../controllers/user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware(), getUsers);

export default router;
