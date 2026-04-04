// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Global variables...!
const port = process.env.PORT;
const environment = process.env.PRODUCTION_MODE
const app = express();
const users = ['ahmed', 'ali', 'sameet', 'azan', 'sadoon'];

// Middlewares...!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  return res?.status(200).send({
    status: 200,
    message: "Node JS project deployment successfull"
  });
});

app.get("/users", (req, res) => {
  // 400
  if (users.length < 1) {
    return res?.status(400).send({
      status: 400,
      message: 'No user found',
      data: []
    });
  };

  // 200
  return res?.status(200).send({
    status: 200,
    message: "Users list fetched successfully",
    data: users
  });
});

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on http://${environment}:${port}`);
});