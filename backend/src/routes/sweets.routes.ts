import { Router } from "express";
import {
  addSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweets.controller";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, addSweet);
router.get("/", getAllSweets);
router.get("/search", searchSweets);
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

export default router;
