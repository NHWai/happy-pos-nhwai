import { Request, Response } from "express";
import PromiseRouter from "express-promise-router";
import MenuCategoriesController from "../controllers/MenuCategoriesController";

const router = PromiseRouter();

router.get("/", MenuCategoriesController.getAllMenuCategories);

export default router;

// const getAllMenuCategories = async (req: Request, res: Response) => {};
