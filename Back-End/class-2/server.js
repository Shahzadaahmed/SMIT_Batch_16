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
  const { role } = req.query;
  console.log("Role: ", role);

  try {
    const usersCount = await UserModal.countDocuments();
    console.log(`Counts: ${usersCount}`);

    if (usersCount < 1) {
      return res.status(400).send({
        status: false,
        message: "No user found",
      });
    }

    // 200 (Query filter)
    if (role) {
      const fetchUsers = await UserModal.find({ role });
      return res.status(200).send({
        status: true,
        message: "Users fetched successfully",
        data: fetchUsers,
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

// Note: Delete data from DB...!
app.delete("/user/delete/:uid", async (req, res) => {
  const { uid } = req.params;
  console.log("Uid: ", uid);

  try {
    // 400
    const checkUid = mongoose.Types.ObjectId.isValid(uid);
    if (!checkUid) {
      return res.status(400).send({
        status: false,
        message: "User id is required or Invalid user id",
      });
    }

    // 200
    const removeUser = await UserModal.findByIdAndDelete(uid);
    if (removeUser) {
      return res.status(200).send({
        status: true,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    // 500
    console.log("Err while deleting data: ", error);
    return res?.status(500).send({
      status: false,
      message: "Err while deleting user",
    });
  }
});

// Note: Update data from DB...!
app.put("/user/update", async (req, res) => {
  const { uid, updatedName, updatedAdd } = req.body;

  try {
    // 400
    if (!uid || !updatedName || !updatedAdd) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    // 200
    const updateData = await UserModal.findByIdAndUpdate(
      uid,
      {
        userName: updatedName,
        address: updatedAdd,
      },
      { new: true }
    );

    if (updateData) {
      return res.status(200).send({
        status: true,
        message: "User updated successfully",
        data: updateData,
      });
    }
  } catch (error) {
    // 500
    console.log("Err while updating data: ", error);
    return res?.status(500).send({
      status: false,
      message: "Err while updating user",
    });
  }
});

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
