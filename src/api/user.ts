import { User } from "../entity/user.entity";
import { myDataSource } from "../services/db";

export const userApi = {
  updateUserById: async (body: any, id: number) =>
    await myDataSource
      .createQueryBuilder()
      .update(User)
      .set(body)
      .where("id = :id", { id })
      .execute(),
  getUserBy: async (obj: any) =>
    await myDataSource.getRepository(User).findOneBy(obj),
  createUser: async (body: any) =>
    await myDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(body)
      .execute(),
};
