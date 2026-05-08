import { Pool } from "pg";
import express from "express";
import home from "./routes/home.js";
import meat from "./routes/meat.js";
import add from "./routes/add-meat.js";
import type from "./routes/type.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use("/", home.router);
app.use("/meat", meat.router);
app.use("/add", add.router);
app.use("/category", type.router);

app.listen(3000, () => {
  console.log("listening port 3000");
});
