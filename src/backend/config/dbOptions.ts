import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PWD || !DB_NAME) {
  throw new Error("Missing one or more DB_* environment variables");
}

export const mongoUri = `mongodb://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PWD)}@${DB_HOST}:${DB_PORT}/?authSource=admin`;

export const dbOptions = {
  dbName: DB_NAME,
};
