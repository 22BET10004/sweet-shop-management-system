import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Root@123",
  database: "sweet_shop_db",
  waitForConnections: true,
  connectionLimit: 10,
});
