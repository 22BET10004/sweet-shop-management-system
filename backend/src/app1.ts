import { db } from "./config/db";

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT 1");
    res.json({ message: "DB connected", rows });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
