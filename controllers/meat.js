import { watch } from "browser-sync";
import db from "../db/meat.js";

const render = async (req, res) => {
  let meats = [];
  const sort = req.query.sort || "nameAsc";

  const types = req.query.type
    ? Array.isArray(req.query.type)
      ? req.query.type
      : [req.query.type]
    : [];

  const SORT_MAP = {
    nameAsc: { col: "name", order: "ASC" },
    nameDesc: { col: "name", order: "DESC" },
    priceAsc: { col: "price", order: "ASC" },
    priceDesc: { col: "price", order: "DESC" },
  };

  const sortOrder = SORT_MAP[sort];
  meats = await db.sort(sortOrder.col, sortOrder.order, types);
  res.render("meat", { meats, types, sort });
};

const getMeat = async (req, res) => {
  const { name } = req.body;
  const meat = await db.getMeat(name);
  res.json(meat);
};

const updateMeat = async (req, res) => {
  try {
    const { name, newName, price, quantity } = req.body;

    await db.updateMeat(name, newName, price, quantity);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

const removeMeat = async (req, res) => {
  try {
    const { name } = req.body;
    await db.removeMeat(name);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
export default { render, getMeat, updateMeat, removeMeat };
