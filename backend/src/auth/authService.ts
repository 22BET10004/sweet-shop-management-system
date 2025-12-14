import crypto from "crypto";

export const registerUser = async (email: string, password: string) => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

export const loginUser = async (email: string, password: string) => {
  // later: verify email & password from DB
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};
