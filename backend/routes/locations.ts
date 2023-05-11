import promiseRouter from "express-promise-router";
import LocationsController from "../controllers/LocationsController";
import verifyUser from "../auth/verify";

const router = promiseRouter();

router.get("/", verifyUser, LocationsController.getAllLocations);

export default router;
   