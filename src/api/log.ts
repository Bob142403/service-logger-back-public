import { Log } from "../entity/log.entity.ts";
import { Service } from "../entity/service.entity";
import { myDataSource } from "../services/db";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export const logApi = {
  getLogs: async () => (await myDataSource.getRepository(Log).find()).reverse(),
  getLogById: async (id: number) =>
    await myDataSource.getRepository(Log).findOneBy({ id }),
  getLogsByServiceId: async (serviceId: number) =>
    await myDataSource.getRepository(Log).findBy({ serviceId }),
  createLog: async (body: any) => {
    const { serviceName, description, type } = body;
    const checkService = await myDataSource.getRepository(Service).findOneBy({
      name: serviceName,
    });
    if (checkService) {
      const log = myDataSource.getRepository(Log).create({
        description,
        type,
        serviceId: checkService.id,
        createdAt: new Date().toLocaleString(),
      });

      socket.emit("update-logs");

      await myDataSource.getRepository(Log).save(log);

      return log;
    } else {
      throw new Error("Incorrect ServiceName!");
    }
  },
};
