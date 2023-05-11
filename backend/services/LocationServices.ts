import { db } from "../db";

const getAllLocations = async () => {
  return db.query("SELECT * FROM locations", []);
};

const LocationServices = {
  getAllLocations,
};

export default LocationServices;
