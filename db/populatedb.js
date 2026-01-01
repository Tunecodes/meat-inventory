#!/usr/bin/env node
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//create toyota vehicle table
const toyotaVehicleTable = `CREATE TABLE toyota_vehicle (
  toyota_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50),
  type VARCHAR(50)
);`;

//add some vehicle to vehicle table
const insertVehicle = `INSERT INTO toyota_vehicle (name, type) VALUES 
  ('RAV4', 'SUV'),
  ('Camry', 'Sedan'),
  ('Prius', 'Hybrid'),
  ('Tacoma', 'Truck');`;

//function to create model tables
const generateTypeTable = (type) => `CREATE TABLE IF NOT EXISTS ${type} (
    suv_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    toyota_id INT,
    model VARCHAR(50),
    image_url VARCHAR(255), 
    year INT,
    price DECIMAL(10,2),
    FOREIGN KEY (toyota_id) REFERENCES toyota_vehicle(toyota_id) ON DELETE CASCADE
);`;

//function to insert car to the corresponding table
const insertCars = (
  type,
  toyota_id,
  model,
  image_url,
  year,
  price,
) => `INSERT INTO ${type} (toyota_id, model, image_url, year, price) VALUES (${toyota_id}, '${model}', '${image_url}', ${year}, ${price});
`;

(async () => {
  console.log("seeding...");
  try {
    await pool.query(toyotaVehicleTable);
    await pool.query(insertVehicle);
    await pool.query(generateTypeTable("SUV"));
    await pool.query(generateTypeTable("Sedan"));
    await pool.query(generateTypeTable("Hybrid"));
    await pool.query(generateTypeTable("Truck"));

    await pool.query(
      insertCars(
        "SUV",
        1,
        "RAV4",
        "https://mystrongad.com/toyota/2025/rav4/2025-toyota-rav4-gray.webp",
        2025,
        29800,
      ),
    );
    await pool.query(
      insertCars(
        "Sedan",
        2,
        "Camry",
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSBOmhFx4WrXK-FFmM-r5SWrmYJALQsM71F4TUEfoflR3levTgAa3kB7Ph4jRCfo0Jy7POTcCJV6jtujo4veMDjaFHhEh74UA",
        2025,
        28700,
      ),
    );

    await pool.query(
      insertCars(
        "Hybrid",
        3,
        "Prius",
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRCDNoKvzyY1LwCXBGoS64Mv6w42FUuDxRgDAloO7kskdPUZ8nEc_4DmYTZN_OQ1q1w4cMGrTtw-qHeW1GyCUdQpuHvmnTJRA",
        2025,
        28550,
      ),
    );

    await pool.query(
      insertCars(
        "Truck",
        4,
        "Tacoma",
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSydi8PcgICY7D8wkL-JDYgxukMUgilGmMAsuf7PXIdtEdCTjfzPuZC-reHfGEiQa5k4AgWf_hiCpsWQsBzH85G8JAsfQSGVw",
        2025,
        31590,
      ),
    );

    console.log("Complete");
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
})();
