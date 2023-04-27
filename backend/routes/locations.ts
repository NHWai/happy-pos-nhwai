import express, { Request, Response } from "express";
import { db } from "../db";
import promiseRouter from "express-promise-router";

const router = promiseRouter();

router.get("/", async (req: Request, res: Response) => {
  const result = await db.query("SELECT * FROM locations", []);
  res.status(200).json(result.rows);
});

// router.get("/:id", async (req: Request, res: Response) => {

// });

export default router;
