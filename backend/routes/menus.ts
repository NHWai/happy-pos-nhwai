import promiseRouter from "express-promise-router";
import upload from "../config/multerUpload";
import MenusController from "../controllers/MenusController";
import verifyUser from "../auth/verify";
import { NextFunction, Request, Response } from "express";

const router = promiseRouter();

router.get("/", verifyUser, MenusController.getMenusByLocationId);
router.get("/:id", verifyUser, MenusController.getMenusById);
router.post("/", verifyUser, MenusController.createMenu);

// error handling middleware
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
});

export default router;
