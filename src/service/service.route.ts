import { Router } from "express";
import ServiceController from "./service.controller.ts";
import { verifyToken } from "../middlewares/verify-token.ts";

const {
  getServiceById,
  createService,
  getServices,
  deleteService,
  updateService,
} = new ServiceController();

const router = Router()
  .use(verifyToken)
  .post("/create-service", createService)
  .get("/list", getServices)
  .get("/get-service/:id", getServiceById)
  .put("/update-service/:id", updateService)
  .delete("/delete-service/:id", deleteService);

export default router;
