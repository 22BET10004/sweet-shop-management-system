import { db } from "./db";

async function testDB() {
  const [rows] = await db.query("SELECT 1");
  console.log("Database connected ✅", rows);
}

testDB();
