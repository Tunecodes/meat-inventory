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
  console.log(sort);

  const sortOrder = SORT_MAP[sort];
  meats = await db.sort(sortOrder.col, sortOrder.order, types);
  res.render("meat", { meats, types, sort });
};

export default { render };
