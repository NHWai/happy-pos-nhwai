import { Request, Response } from "express";
import LocationServices from "../services/LocationServices";

const getAllLocations = async (req: Request, res: Response) => {
  //
  const result = await LocationServices.getAllLocations();
  res.status(200).json(result.rows);
};

const LocationsController = {
  getAllLocations,
};

export default LocationsController;
