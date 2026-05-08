import express from "express";
import type from "../controllers/type.js";

const router = express.Router();

router.get("/", type.render);

export default { router };
