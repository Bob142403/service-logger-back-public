import { Service } from "../entity/service.entity";
import { myDataSource } from "../services/db";

export const serviceApi = {
  getServices: async (userId: number) =>
    await myDataSource.getRepository(Service).findBy({
      userId,
    }),
  getService: async (id: number) =>
    await myDataSource.getRepository(Service).findOneBy({
      id,
    }),
  deleteService: async (id: number) =>
    await myDataSource.getRepository(Service).delete({
      id,
    }),
  createService: async (body: any) =>
    await myDataSource
      .createQueryBuilder()
      .insert()
      .into(Service)
      .values(body)
      .execute(),
  updateService: async (body: any, id: number) =>
    await myDataSource
      .createQueryBuilder()
      .update(Service)
      .set(body)
      .where("id = :id", { id })
      .execute(),
};
