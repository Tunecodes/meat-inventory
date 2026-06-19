import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const addMeat = async (name, type, quantity, image_url, price) => {
  await pool.query(
    `INSERT INTO meat (name, type, quantity, image_url, price) VALUES ($1, $2, $3, $4, $5)`,
    [name, type, quantity, image_url, price],
  );
};

const getAllMeat = async () => {
  const result = await pool.query("SELECT * FROM meat");
  return result.rows;
};

//sort by price
const sort = async (col, order, types = []) => {
  const hasTypes = Array.isArray(types) && types.length > 0;

  const sql = hasTypes
    ? `SELECT * FROM meat WHERE type = ANY($1) ORDER BY ${col} ${order}`
    : `SELECT * FROM meat ORDER BY ${col} ${order}`;

  const params = hasTypes ? [types] : [];
  const result = await pool.query(sql, params);
  return result.rows;
};

//get meat by name
const getMeat = async (name) => {
  const result = await pool.query(`SELECT * FROM meat WHERE name = ($1)`, [
    name,
  ]);
  return result.rows;
};

//update meat
const updateMeat = async (oldName, newName, price, quantity) => {
  await pool.query(
    `UPDATE meat SET name = $2, price = $3, quantity = $4 WHERE name = $1`,
    [oldName, newName, price, quantity],
  );
};

const removeMeat = async (name) => {
  await pool.query(`DELETE FROM meat where name = $1`, [name]);
};
export default { addMeat, getAllMeat, sort, getMeat, updateMeat, removeMeat };
