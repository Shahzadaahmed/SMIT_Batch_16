// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";

// Environment variables config...!
config({
  path: "./.env",
});

// Note: Database connection here...!
mongoose
  .connect(process.env.MONGO_DB_URL, { dbName: "TTS_16_DB" })
  .then((res) => {
    console.log("Mongo DB connected successfully");
  })
  .catch((err) => {
    console.log(`Something went wrong while connecting DB: ${err}`);
  });

// Global variables...!
const port = process.env.PORT;
const app = express();

// Middlewares...!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Create 1st api: / route...!
app.get("/", (req, res) => {
  return res.status(200).send({
    statusCode: 200,
    message: "Welcome to Back End using Node JS",
  });
});

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});