import promiseRouter from "express-promise-router";
import UsersController from "../controllers/UsersController";

const router = promiseRouter();

router.post("/login", UsersController.userLogin);
router.post("/register", UsersController.userRegister);

export default router;
