import express, { Request, Response, NextFunction } from "express";

import MenuServices from "../services/MenuServices";
import upload from "../config/multerUpload";

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
  //uploading the menu photo
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
    const files = req.files as Express.MulterS3.File[];
    const file = files[0];
    const menuUrl = file.location;
    const { menuName, price, locationId } = req.body;

    const result = await MenuServices.createMenu(
      menuName,
      Number(price),
      Number(locationId),
      menuUrl
    );
    res.status(201).json({ message: "created a menu" });
  });
};

const MenusController = {
  getMenusByLocationId,
  getMenusById,
  createMenu,
};

export default MenusController;
