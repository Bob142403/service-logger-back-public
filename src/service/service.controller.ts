import { Request, Response } from "express";
import { serviceApi } from "../api/service.ts";

class ServiceController {
  async createService(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const service = await serviceApi.createService({
        name,
        userId: req.body.auth.id,
      });

      res.status(200).json(service);
    } catch (err) {
      res.status(400).json(err);
    }

    return req.body;
  }
  async getServices(req: Request, res: Response) {
    const services = await serviceApi.getServices(req.body.auth.id);

    res.status(200).json(
      services.map((serivce) => {
        return { ...serivce, key: `${serivce.id}` };
      })
    );
    return services;
  }
  async getServiceById(req: Request, res: Response) {
    const service = await serviceApi.getService(+req.params.id);

    res.status(200).json(service);

    return service;
  }
  async deleteService(req: Request, res: Response) {
    const results = await serviceApi.deleteService(+req.params.id);

    if (results.affected) res.status(200).json("Service Deleted");
    else res.status(400).json("Incorrect Id!");

    return results;
  }
  async updateService(req: Request, res: Response) {
    try {
      const service = await serviceApi.updateService(
        { name: req.body.name },
        +req.params.id
      );
      console.log(service);
      if (service.affected) {
        res.json(service);
      } else res.status(400).json("Error");
    } catch (err) {
      res.status(400).json(err);
    }
    return req.body;
  }
}

export default ServiceController;
