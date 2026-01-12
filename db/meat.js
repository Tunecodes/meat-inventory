import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASEURL });
const tableName = "meat";

const addMeat = (name, type, quantity, image_url, price) => {
  pool.query(
    `INSERT ${tableName}(name, type, quantity, image_url, price) VALUES ($1, $2, $3, $4, $5)`,
    [name, type, quantity, image_url, price],
  );
};
