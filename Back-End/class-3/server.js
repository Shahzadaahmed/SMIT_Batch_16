// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import conectMongoDB from "./src/database/db.js";

import userRoutes from "./src/routes/user-routes/user-routes.js";

// Environment variables config...!
config({
  path: "./.env",
});

// Note: Database connection here...!
conectMongoDB();

// Global variables...!
const port = process.env.PORT;
const app = express();

// Middlewares...!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/user", userRoutes);

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
