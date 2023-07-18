import { userApi } from "../api/user.ts";
import { Request, Response } from "express";

class UsersController {
  async updateUser(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    try {
      const user = await userApi.updateUserById(
        { firstName, lastName, email, password },
        +req.params.id
      );
      if (user.affected) {
        res.json(user);
      } else res.status(400).json("Error");
    } catch (err) {
      res.status(400).json(err);
    }
    return req.body;
  }
}

export default UsersController;
