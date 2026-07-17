import dotenv from "dotenv";
dotenv.config();

import { app } from "./express.ts";
import { connectDB } from "./services/DBConnection.ts";

async function startServer(): Promise<void> {
  await connectDB();
  const PORT: number = parseInt(process.env.PORT!) || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
