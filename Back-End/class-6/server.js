// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/database/db.js";
import crypto from "crypto";

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
    message: "Node JS with Postgress SQL",
  });
});

app.get("/api/fetch/date", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Result: ", result);

    return res?.status(200)?.send({
      status: true,
      message: "Current date or time",
      data: result.rows[0]?.now,
    });
  } catch (error) {
    console.log("Err while fetching date: ", error);
    return res?.status(500).send({
      status: false,
      message: "Err while fetching date",
    });
  }
});

// Create user api...!
app.post("/api/add/user", async (req, res) => {
  const { username, email, password } = req?.body;

  try {
    const pass = crypto.createHash("sha256").update(password).digest("hex");
    // console.log("Hashed password: ", pass);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, pass],
    );
    console.log("Res: ", result?.rows);

    if (result) {
      return res?.status(200).send({
        status: true,
        message: "User created",
      });
    }
  } catch (error) {
    console.log("Something went wrong while saving user: ", error);
    return res?.status(500).send({
      status: false,
      message: "Something went wrong while saving user",
    });
  }
});

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on http://${environment}:${port}`);
});
