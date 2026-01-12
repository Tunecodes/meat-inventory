import { Pool } from "pg";
import express from "express";
import home from "./routes/home.js";
import meat from "./routes/meat.js";
import add from "./routes/add-meat.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", home.router);
app.use("/meat", meat.router);
app.use("/add", add.router);

app.listen(3000, () => {
  console.log("listening port 3000");
});
