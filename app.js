import { Pool } from "pg";
import express from "express";
import main from "./controllers/main.js";



const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", main.mainPage);

app.listen(3000, () => {
  console.log("listening port 3000");
});
