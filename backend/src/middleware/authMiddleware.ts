import { Request, Response, NextFunction } from "express";

/**
 * Extend Express Request to include user
 */
export interface AuthRequest extends Request {
  user?: {
    role: "ADMIN" | "USER";
  };
}

/**
 * Authentication Middleware (Mock)
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Temporary role logic
  if (authHeader.includes("admin")) {
    req.user = { role: "ADMIN" };
  } else {
    req.user = { role: "USER" };
  }

  next();
};

/**
 * Admin-only Middleware
 */
export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};
