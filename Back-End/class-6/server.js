// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/database/db.js";

dotenv.config({ path: "./.env" });

// Global variables...!
const port = process.env.PORT;
const environment = process.env.ENV_MODE;
const app = express();

// Middlewares...!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  return res?.status(200).send({
    status: 200,
    message: "Node JS with Postgress SQL"
  });
});

app.get("/api/fetch/date", async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log("Result: ", result);

    return res?.status(200)?.send({
      status: true,
      message: "Current date or time",
      data: result.rows[0]?.now
    });
  }

  catch (error) {
    console.log('Err while fetching date: ', error);
    return res?.status(500).send({
      status: false,
      message: "Err while fetching date"
    });
  }
});

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on http://${environment}:${port}`);
});