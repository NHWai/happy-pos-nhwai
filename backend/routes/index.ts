import express from "express";
import menuRouter from "./menus";
import locationRouter from "./locations";

const router = express.Router();

router.use("/menus", menuRouter);
router.use("/locations", locationRouter);

export default router;
