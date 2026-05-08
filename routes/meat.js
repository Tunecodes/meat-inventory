import express from "express";
import meat from "../controllers/meat.js";

const router = express.Router();

router.get("/", meat.render);
router.post("/get", meat.getMeat);
router.post("/update", meat.updateMeat);
router.delete("/remove", meat.removeMeat);

export default { router };
