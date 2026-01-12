import express from "express";
import home from "../controllers/home.js";

const router = express.Router();

router.get("/", home.mainPage);

export default { router };
