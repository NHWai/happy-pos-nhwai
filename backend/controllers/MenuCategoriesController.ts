import { Request, Response } from "express";
import MenuCategoriesServices from "../services/MenuCategoriesServices";

const getAllMenuCategories = async (req: Request, res: Response) => {
  try {
    const result = await MenuCategoriesServices.getAllMenuCategories();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

const MenuCategoriesController = {
  getAllMenuCategories,
};

export default MenuCategoriesController;
