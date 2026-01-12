import express from "express";
import add from "../controllers/add-meat.js";

const router = express.Router();

router.get("/", add.render);

export default { router };
