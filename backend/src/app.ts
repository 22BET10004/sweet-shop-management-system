import express from "express";
import cors from "cors";
import sweetsRoutes from "./routes/sweets.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sweets", sweetsRoutes);

app.get("/", (req, res) => {
  res.send("Sweet Shop API is running");
});

export default app;
