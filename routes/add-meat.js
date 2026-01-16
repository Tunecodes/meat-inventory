import express from "express";
import add from "../controllers/add-meat.js";

const router = express.Router();

router.get("/", add.render);
router.post("/submit", add.addMeat);

export default { router };
