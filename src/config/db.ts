import { config } from "dotenv";

config();

export const dbConfig = {
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
