import { Request, Response } from "express";
import { registerUser, loginUser } from "./authService";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const token = await registerUser(email, password);

  return res.status(201).json({
    message: "User registered successfully",
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const token = await loginUser(email, password);

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};
