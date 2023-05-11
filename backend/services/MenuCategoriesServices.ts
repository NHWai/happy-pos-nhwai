import { db } from "../db";

const getAllMenuCategories = async () => {
  return db.query("select * from menu_categories", []);
};

const MenuCategoriesServices = {
  getAllMenuCategories,
};

export default MenuCategoriesServices;
