import express, { Request, Response } from "express";
import { db } from "../db";
import promiseRouter from "express-promise-router";

const router = promiseRouter();

router.get("/", async (req: Request, res: Response) => {
  const { location } = req.query;
  const text = `select menus.id, menus.name, menus.price from menus 
  left join menus_locations on menus.id = menus_locations.menus_id 
  where menus_locations.locations_id = $1 and menus_locations.is_available = true`;
  const result = await db.query(text, [location]);
  res.send(result.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const text: string = "select * from menus where id = $1";
  const text1: string = `
  select menus.name as menu_name, menus.price as menu_price, menu_categories.name as menu_categories_name from menus 
  left join menus_menu_categories on menus_menu_categories.menus_id = menus.id
  left join menu_categories on menu_categories.id = menus_menu_categories.menu_categories_id
  WHERE menus.id = $1
  `;
  const text2: string = `
  select menus.name as menu_name, menus.price as menu_price, addon_categories.name as addon_categories_name , addon_categories.is_required as addon_categories_is_required, addons.name as addons_name, addons.price as addons_price, addons.is_available as addons_is_available from menus
  left join menus_addon_categories on menus_addon_categories.menus_id = menus.id
  left join addon_categories on addon_categories.id = menus_addon_categories.addon_categories_id
  left join addons on addons.addon_categories_id = addon_categories.id
  WHERE menus.id = $1
  `;
  const { id } = req.params;
  const { rows: row1 } = await db.query(text1, [id]);
  const { rows: row2 } = await db.query(text2, [id]);
  const resBody = {
    menu_name: row1[0].menu_name,
    menu_price: row1[0].menu_price,
    menu_categories_names: row1.map((el) => el.menu_categories_name),
    addon_categories: Array.from(
      new Set(row2.map((el) => el.addon_categories_name))
    ),
    addons: row2.map((el) => {
      return {
        category: el.addon_categories_name,
        name: el.addons_name,
        price: el.addons_price,
        is_available: el.addons_is_available,
      };
    }),
  };

  res.send(resBody);
});

export default router;
