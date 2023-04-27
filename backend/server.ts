import express from "express";
import routes from "./routes";
import cors from "cors";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
