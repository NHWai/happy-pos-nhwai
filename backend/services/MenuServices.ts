import { db } from "../db";
import { QueryResult } from "pg";

interface Menu {
  id: number;
}

const getMenusByLocationId = async (locationId: number) => {
  const text = `select menus.id, menus.name, menus.price, menus.menu_url from menus
  left join menus_locations on menus.id = menus_locations.menus_id
  where menus_locations.locations_id = $1 and menus_locations.is_available = true`;
  return db.query(text, [locationId]);
};

const getMenusById = async (id: number) => {
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
  return resBody;
};

const createMenu = async (
  menuName: string,
  price: number,
  locationId: number,
  menuUrl: string
) => {
  const insertMenusQuery = `INSERT INTO menus(name,price,menu_url) VALUES ($1,$2,$3) RETURNING id`;
  const insertMenusLocationsQuery =
    "INSERT INTO menus_locations (menus_id, locations_id) VALUES ($1, $2)";

  const { rows }: QueryResult<Menu> = await db.query(insertMenusQuery, [
    menuName,
    price,
    menuUrl,
  ]);
  const menu_id = rows[0].id;
  const result = await db.query(insertMenusLocationsQuery, [
    menu_id,
    locationId,
  ]);

  return result;
};

const MenuServices = {
  getMenusByLocationId,
  getMenusById,
  createMenu,
};

export default MenuServices;
