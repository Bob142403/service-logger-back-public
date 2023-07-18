import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import SignIn from "../types/SignIn.ts";
import { jwtConfig } from "../config/jwt.ts";
import { userApi } from "../api/user.ts";

class Auth {
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await userApi.getUserBy({
        email,
        password,
      });
      const token = jsonwebtoken.sign(req.body, jwtConfig.privateKey);
      if (!user) {
        res.status(404).json("Incorrect Email or Passsword");
      } else res.status(200).json({ token, user });
    } catch (err) {
      res.status(400).json(err);
    }
    return req.body;
  }
  async auth(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(400).json("Token is not verifed!");

      const user = jsonwebtoken.verify(token, jwtConfig.privateKey) as SignIn;
      const userInfo = await userApi.getUserBy({ email: user.email });

      if (userInfo) res.status(200).json(userInfo);
      else res.status(400).json("Error");
    } catch (err) {
      res.status(400).json("Token is not verifed!");
    }
  }
  async signUp(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const userCheck = await userApi.getUserBy({ email });

      if (userCheck) {
        res.status(400).json("This email is already Excist");
        return req.body;
      }

      await userApi.createUser(req.body);
      res.status(200).json("User Created");
    } catch (err) {
      res.status(400);
    }

    return req.body;
  }
}

export default Auth;
