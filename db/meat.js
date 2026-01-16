import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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

export default { addMeat, getAllMeat, sort };
