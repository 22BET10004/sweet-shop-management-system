import { Request, Response } from "express";
import { db } from "../config/db";

/**
 * ADD SWEET (Admin only)
 */
export const addSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [result]: any = await db.query(
      "INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)",
      [name, category, price, quantity]
    );

    return res.status(201).json({
      id: result.insertId,
      name,
      category,
      price,
      quantity,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add sweet", error });
  }
};

/**
 * GET ALL SWEETS
 */
export const getAllSweets = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM sweets");
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch sweets", error });
  }
};

/**
 * SEARCH SWEETS
 */
export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let query = "SELECT * FROM sweets WHERE 1=1";
    const params: any[] = [];

    if (name) {
      query += " AND name LIKE ?";
      params.push(`%${name}%`);
    }

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    if (minPrice) {
      query += " AND price >= ?";
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += " AND price <= ?";
      params.push(Number(maxPrice));
    }

    const [rows] = await db.query(query, params);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Search failed", error });
  }
};

/**
 * PURCHASE SWEET
 */
export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const sweetId = Number(req.params.id);

    const [rows]: any = await db.query(
      "SELECT quantity FROM sweets WHERE id = ?",
      [sweetId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (rows[0].quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    await db.query(
      "UPDATE sweets SET quantity = quantity - 1 WHERE id = ?",
      [sweetId]
    );

    const [updated]: any = await db.query(
      "SELECT * FROM sweets WHERE id = ?",
      [sweetId]
    );

    return res.status(200).json(updated[0]);
  } catch (error) {
    return res.status(500).json({ message: "Purchase failed", error });
  }
};

/**
 * RESTOCK SWEET (Admin only)
 */
export const restockSweet = async (req: Request, res: Response) => {
  try {
    const sweetId = Number(req.params.id);
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const [result]: any = await db.query(
      "UPDATE sweets SET quantity = quantity + ? WHERE id = ?",
      [quantity, sweetId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    const [updated]: any = await db.query(
      "SELECT * FROM sweets WHERE id = ?",
      [sweetId]
    );

    return res.status(200).json(updated[0]);
  } catch (error) {
    return res.status(500).json({ message: "Restock failed", error });
  }
};
