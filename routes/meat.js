import express from "express";

const router = express.Router();

router.get("/", (res, req) => {
  res.log("hello");
});

export default { router };
