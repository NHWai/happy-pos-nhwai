import express, { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

interface JwtPayload {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

dotenv.config();

const verifyUser = async (req: Request, res: Response, next: () => void) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    res.status(403).json({ message: "You need to login" });
  } else {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.SECRET as string
    ) as JwtPayload;

    if (Date.now() >= decoded["exp"] * 1000) {
      res.status(401).json({ message: "You need to login" });
    }
    next();
  }
};
export default verifyUser;
