import promiseRouter from "express-promise-router";
import menuRouter from "./menus";
import locationRouter from "./locations";
import userRouter from "./users";
import verifyUser from "../auth/verify";

const router = promiseRouter();

router.use("/menus", verifyUser, menuRouter);
router.use("/locations", locationRouter);
router.use("/users", userRouter);

export default router;
