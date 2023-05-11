import express from "express";
import cors from "cors";
import menusRouter from "./routes/menus";
import usersRouter from "./routes/users";
import locationsRouter from "./routes/locations";
import menuCategoriesRouter from "./routes/menu-categories";

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/menus", menusRouter);
app.use("/api/users", usersRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/menu-categories", menuCategoriesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
