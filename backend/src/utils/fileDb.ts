import fs from "fs";
import path from "path";

export const readDB = <T>(file: string): T => {
  const filePath = path.join(__dirname, "../../data", file);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

export const writeDB = (file: string, data: any) => {
  const filePath = path.join(__dirname, "../../data", file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
