import { Router } from "express";
import UsersController from "./user.controller.ts";
import { verifyToken } from "../middlewares/verify-token.ts";

const { updateUser } = new UsersController();

const router = Router().use(verifyToken).put("/update-user/:id", updateUser);

export default router;
