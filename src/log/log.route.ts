import { Router } from "express";
import { verifyToken } from "../middlewares/verify-token";
import LogController from "./log.controller";

const { getLogById, getLogs, createLog } = new LogController();

const router = Router()
  .use(verifyToken)
  .get("/list", getLogs)
  .get("/get-log/:id", getLogById)
  .post("/create-log", createLog);

export default router;
