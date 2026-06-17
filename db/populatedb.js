#!/usr/bin/env node
import { Pool } from "pg";
import "dotenv/config";
import { watch } from "browser-sync";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

//create meat table
const createMeatTable = `
CREATE TABLE meat (
  meat_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  type VARCHAR(50),
  quantity INT,
  image_url VARCHAR(255),
  price DECIMAL(7,2)
);`;

//add some meat to the table
const insertMeat = (name, type, quantity, image_url, price) =>
  `INSERT INTO meat (name, type, quantity, image_url, price) VALUES ('${name}', '${type}', ${quantity}, '${image_url}', ${price});`;
(async () => {
  console.log("seeding...");
  try {
    await pool.query(createMeatTable);
    await pool.query(
      insertMeat(
        "Ribeye",
        "Beef",
        12,
        "https://embed.widencdn.net/img/beef/ng96sbyljl/800x600px/Ribeye%20Steak_Lip-on.psd?keep=c&u=7fueml",
        25.21,
      ),
    );
    await pool.query(
      insertMeat(
        "T Bone",
        "Beef",
        20,
        "https://normanhotel.com.au/wp-content/uploads/2021/12/Beef-T-Bone-scaled.jpg",
        14.67,
      ),
    );

    await pool.query(
      insertMeat(
        "Pork Chop",
        "Pork",
        54,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5JQU-2kMlWJ0W-QEJZRdXaeueRk1hdJ_rxw&s",
        8.79,
      ),
    );

    await pool.query(
      insertMeat(
        "Bacon",
        "Pork",
        22,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpREs_6yZ-61V_OJX6LqhwYZrvnUdsa3IBxQ&s",
        10.79,
      ),
    );

    await pool.query(
      insertMeat(
        "Chicken Breast",
        "Poultry",
        11,
        "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_6d0c0d25-f67d-4828-99c2-f12a9327224a.jpg",
        13.19,
      ),
    );

    await pool.query(
      insertMeat(
        "Chicken Thigh",
        "Poultry",
        41,
        "https://img.freepik.com/premium-photo/fresh-chicken-thighs-isolated-white-background_461160-1669.jpg",
        3.99,
      ),
    );

    await pool.query(
      insertMeat(
        "Ground Lamb",
        "Poultry",
        41,
        "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_d3ca0c95-d9b2-444c-bc16-bb1fae8b160e.jpeg",
        20.99,
      ),
    );

    await pool.query(
      insertMeat(
        "Salmon",
        "Seafood",
        3,
        "https://www.bigalaskaseafood.com/cdn/shop/files/fresh_king_fillet_BAS_24.jpg?v=1721857450",
        40.29,
      ),
    );

    await pool.query(
      insertMeat(
        "Tuna",
        "Seafood",
        5,
        "https://shop.yamaseafood.com/cdn/shop/products/FreshTuna-997213.png?v=1707412526",
        23.19,
      ),
    );

    await pool.query(
      insertMeat(
        "Shrimp",
        "Seafood",
        55,
        "https://www.honolulucatch.com/cdn/shop/products/cpd_L_HC_4.0_1000x1000.jpg?v=1681241910",
        12.36,
      ),
    );

    await pool.query(
      insertMeat(
        "Sausage",
        "Processed",
        23,
        "https://www.greenfreshfood.com/storage/uploads/images/202310/05/1696483902_YYrsKCAdw7.jpg",
        10.93,
      ),
    );

    console.log("Complete");
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
})();
