// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import * as dns from "dns"; // For resolving hostnames...!
import nodeCache from "node-cache";
import compression from "compression";
import rateLimit from "express-rate-limit";

dns.setDefaultResultOrder("ipv4first"); // For resolving hostnames to IPv4 addresses first...!
dns.setServers(["1.1.1.1", "8.8.8.8"]); // For setting custom DNS servers...!

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
      // unique: true,
      // index: true // General indexing
    },
    password: String,
    role: {
      type: String,
      required: true,
      enum: ["admin", "customer"],
      // index: true
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

// Compound indexing on email...!
userSchema.index({ email: 1 }, { unique: true });

const UserModal = mongoose.model("User", userSchema);

// Global variables...!
const port = process.env.PORT;
const app = express();
const cacheClient = new nodeCache();
const limit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10,
  standardHeaders: true,
  skip: (req) => req?.method === 'OPTIONS'
});

// Middlewares...!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(limit);

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

  const page = 1;
  const limit = 10;

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
      const fetchUsers = await UserModal
        .find({ role })
        .skip((page - 1) * limit)
        .limit(limit);
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

// fetch user by uid...!
app.get('/user/fetch/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const redisKey = uid;
    console.log(`User Id: ${redisKey}`);

    const cachedData = await cacheClient.get(redisKey);

    if (cachedData) {
      console.log('User fetched from Cache.');
      return res?.status(200).send({
        status: true,
        message: "User fecthed succussfully",
        data: JSON.parse(cachedData)
      });
    };

    const fetchUser = await UserModal
      .findById(redisKey)
      .select('userName')
      .lean();
    await cacheClient.set(redisKey, JSON.stringify(fetchUser), 60);

    if (fetchUser) {
      console.log('User fetched from DB.');
      return res?.status(200).send({
        status: true,
        message: "User fecthed succussfully",
        data: fetchUser
      });
    };
  }

  catch (error) {
    console.log("Err while fetching user data by id: ", error);
    return res?.status(500).send({
      status: false,
      message: "Err while fetching user data by id",
    });
  }
});

app.get('/view/portfolio', (req, res) => {
  // return res.status(200).send('<h1> Welcome to Node JS! </h1>');
  return res.redirect('https://ali-portfolio-nine.vercel.app/');
});

app.get('/user/fetchByEmail/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const fetchUser = await UserModal.find({ email: email }).explain();
    console.log("Check indexing: ", fetchUser);

    if (fetchUser) {
      return res?.status(200).send({
        status: true,
        message: "User fetched succussfully by email",
        data: fetchUser
      });
    };
  }

  catch (error) {
    console.log("Err while fetching user data by email: ", error);
    return res?.status(500).send({
      status: false,
      message: "Err while fetching user data by email",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});