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

/*** User Schema ***/
const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      required: true,
      enum: ["admin", "customer"],
    },
    address: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users-list",
  }
);
const UserModal = mongoose.model("User", userSchema);

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

// Note: Create / save user in DB...!
app.post("/user/save", async (req, res) => {
  // console.log(`Body: ${JSON.stringify(req.body)}`);

  try {
    // 400:
    const bodyValues = Object.values(req.body);
    const isValidate = bodyValues?.some((item) => {
      return item == "";
    });

    if (isValidate) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    // 200:
    const newUser = new UserModal(req.body);
    const saveUser = await newUser.save();

    if (saveUser) {
      return res.status(200).send({
        status: true,
        message: "User saved successfully",
        data: newUser,
      });
    }
  } catch (error) {
    // 500:
    console.log("Err from server side: ", error);

    return res.status(500).send({
      status: false,
      message: "Err from server side",
      serverErrMsg: error,
    });
  }
});

// Note: Fetch all users from DB...!
app.get("/users/fetch/all", async (req, res) => {
  try {
    const usersCount = await UserModal.countDocuments();
    console.log(`Counts: ${usersCount}`);

    if (usersCount < 1) {
      return res.status(400).send({
        status: false,
        message: "No user found",
      });
    }

    // 200:
    const fetchUsers = await UserModal.find();
    return res.status(200).send({
      status: true,
      message: "Users fetched successfully",
      data: fetchUsers,
    });
  } catch (error) {
    console.log("Something went wrong while fetching users: ", error);

    return res.status(500).send({
      status: false,
      message: "Something went wrong while fetching users",
    });
  }
});

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
