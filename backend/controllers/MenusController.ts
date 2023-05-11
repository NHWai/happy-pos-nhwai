import express, { Request, Response, NextFunction } from "express";

import MenuServices from "../services/MenuServices";

const getMenusByLocationId = async (req: Request, res: Response) => {
  const { location } = req.query;
  const result = await MenuServices.getMenusByLocationId(Number(location));
  res.status(200).json(result.rows);
};

const getMenusById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const resBody = await MenuServices.getMenusById(Number(id));
    res.status(200).json(resBody);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const createMenu = async (req: Request, res: Response, next: NextFunction) => {
  const { menuName, price, locationId } = req.body;

  const result = await MenuServices.createMenu(menuName, price, locationId);
  res.status(201).json({ message: "created a menu" });
};

const MenusController = {
  getMenusByLocationId,
  getMenusById,
  createMenu,
};

export default MenusController;
