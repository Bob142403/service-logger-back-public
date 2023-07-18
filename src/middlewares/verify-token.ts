import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../services/db.ts";
import { User } from "../entity/user.entity.ts";
import SignIn from "../types/SignIn.ts";
import { jwtConfig } from "../config/jwt.ts";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json("Empty Token!");

    const user = jsonwebtoken.verify(token, jwtConfig.privateKey) as SignIn;

    const userInfo = await myDataSource
      .getRepository(User)
      .findOneBy({ email: user.email });

    req.body = { ...req.body, auth: userInfo };

    next();
  } catch (err) {
    res.status(400).json("Token is not verified");
  }
}
