import db from "../db/meat.js";
const render = (req, res) => {
  res.render("add-meat");
};

const addMeat = (req, res) => {
  const { name, type, image, price, quantity } = req.body;
  db.addMeat(name, type, quantity, image, price);
  res.redirect(303, "/");
};

export default { render, addMeat };
