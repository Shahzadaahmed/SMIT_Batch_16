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

// Update user api...!
app.patch("/api/update/user", async (req, res) => {
  try {
    const { id, username, email, password } = req.body;

    if (!id || !username || !email || !password) {
      return res?.status(400).send({
        status: false,
        message: "Input fields are required!"
      });
    };

    let fields = [];
    let values = [];
    let index = 1;

    if (username) {
      fields.push(`username = $${index++}`);
      values.push(username)
    };

    if (email) {
      fields.push(`email = $${index++}`);
      values.push(email)
    };

    if (password) {
      const pass = crypto.createHash("sha256").update(password).digest("hex");
      fields.push(`password = $${index++}`);
      values.push(pass)
    };

    if (fields.length == 0) {
      return res?.status(400).send({
        status: false,
        message: "No fields to update"
      });
    };

    values.push(id);

    console.log(`Fields: ${fields}`);
    console.log(`Values: ${values}`);

    const myQuery = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${index}
      RETURNING id, username, email, createdat
      `;

    const result = await pool.query(myQuery, values);
    console.log(`Result: ${result}`);

    if (result?.rowCount == 0) {
      return res?.status(404).send({
        status: false,
        message: "User not found"
      });
    };

    return res?.status(200).send({
      status: true,
      message: "User updated successfully",
      data: result.rows[0]
    });
  }

  catch (error) {
    console.log(`Something wnet wrong while updating user: ${error}`);

    return res?.status(500).send({
      status: false,
      message: "Something wnet wrong while updating user"
    });
  };
});

// Fetch user by id api...!
app.get('/api/fetch/user/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Uid: ${id}`);

  const user = await pool.query(`SELECT * from users WHERE id = ${id}`);

  if (user.rowCount == 0) {
    return res.status(404).send({
      status: true,
      message: 'user not found'
    })
  }

  return res.status(200).send({
    status: true,
    message: 'user fetched succesfully',
    data: user.rows[0]
  })

})

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on http://${environment}:${port}`);
});
