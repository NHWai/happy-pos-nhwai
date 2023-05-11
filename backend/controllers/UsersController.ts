import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import UserServices from "../services/UserServices";

const saltRounds = 10;
dotenv.config();

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //validating password
  // 1) Load hashed password from DB
  const user = await UserServices.userLogin(email);

  if (user.rows.length === 0)
    return res.send(400).json({ msg: "Bad Request, no user found" });

  const hashedPasswordDB = user.rows[0].password;

  //2) comparing db password and input password
  const isValid = bcrypt.compareSync(password, hashedPasswordDB);
  if (!isValid)
    return res.status(401).json({ msg: "Bad Request, no user found" });

  //signing a jwt token
  const secretkey = process.env.SECRET as string;
  const payload = { userId: user.rows[0].id, username: user.rows[0].name };

  //set token to be expired in 50mins
  const expiresIn = 60 * 50;
  const token = jwt.sign(payload, secretkey, { expiresIn });
  return res
    .status(200)
    .json({ token, expiresIn: Date.now() + expiresIn * 1000 });
};

const userRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  //hashing password
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  try {
    const { rows } = await UserServices.userRegister(
      name,
      email,
      hashedPassword
    );
    res.status(201).json({ message: "user created" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

const UsersController = {
  userLogin,
  userRegister,
};

export default UsersController;
