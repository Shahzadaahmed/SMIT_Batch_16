// Note: Main server file...!
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./src/database/db.js');

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
    message: "Node JS with Knex JS and Postgres DB",
  });
});

// Create a user...!
app.post("/user/create", async (req, res) => {
  try {
    const { username, email } = req?.body;
    const [user] = await db('users').insert({ username, email }).returning('*');

    return res?.status(200).send({
      status: true,
      message: "User created successfully"
    });
  }

  catch (error) {
    console.log('Something went wrong while creating user: ', error);
    return res?.status(500).send({
      status: false,
      message: "Something went wrong while creating user"
    });
  }
});

// Fetch all users...!
app.get("/users/fetch-all", async (req, res) => {
  try {
    const fetchUsers = await db('users').select('*');

    if (fetchUsers.length < 1) {
      return res?.status(400).send({
        status: false,
        message: "No user found"
      });
    }

    return res?.status(200).send({
      status: true,
      message: "Users",
      data: fetchUsers
    });
  }

  catch (error) {
    console.log('Something went wrong while fethcing all users: ', error);
    return res?.status(500).send({
      status: false,
      message: "Something went wrong while fethcing all users"
    });
  }
});

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on http://${environment}:${port}`);
});
