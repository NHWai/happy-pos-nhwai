import express, { Request, Response } from "express";
import { db } from "../db";
import promiseRouter from "express-promise-router";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();

const saltRounds = 10;

const router = promiseRouter();

// logging in user
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //validating password
  // 1) Load hashed password from DB
  const user = await db.query("select * from users where email = $1", [email]);
  if (user.rows.length === 0)
    return res.send(400).json({ msg: "Bad Request, no user found" });

  const hashedPasswordDB = user.rows[0].password;

  //2) comparing db password and input password
  const isValid = bcrypt.compareSync(password, hashedPasswordDB);
  if (!isValid)
    return res.status(401).json({ msg: "Bad Request, no user found" });

  //signing a jwt token
  const secretkey = process.env.SECRET;
  const payload = { userId: user.rows[0].id, username: user.rows[0].name };

  //set token to be expired in 50mins
  const expiresIn = 60 * 50;
  const token = jwt.sign(payload, secretkey as string, { expiresIn });

  return res
    .status(200)
    .json({ token, expiresIn: Date.now() + expiresIn * 1000 });
});

//registering user
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const text = `INSERT INTO users (name,email,password) VALUES($1,$2,$3)`;

  //validating email is unique
  const results = await db.query("select * from users where email = $1", [
    email,
  ]);
  if (results.rows.length > 0) {
    console.log("email is not unique");
    return res.status(400).json({ msg: "Invalid Inputs" });
  }

  //hashing password
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const { rows } = await db.query(text, [name, email, hashedPassword]);
  if (rows.length === 0) {
    return res.status(200).json({ msg: "is all good" });
  }
  return res.status(400).json({ msg: "error" });
});

export default router;
