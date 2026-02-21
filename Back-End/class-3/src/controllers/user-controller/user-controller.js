// All user related controller functions are defined here...!

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModal from "../../models/user-model/user-model.js";

const welcomeToDB = (req, res) => {
  return res?.status(200).send({
    status: true,
    message: "Welcome to Node JS!",
  });
};

// Create or save user in DB
const createUser = async (req, res) => {
  console.log(`Body: ${JSON.stringify(req.body)}`);

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

    // 404
    const isUserExist = await UserModal.findOne({ email: req?.body?.email });
    if (isUserExist) {
      return res.status(404).send({
        status: false,
        message: "User with this email already exist",
      });
    }

    // 200:
    // Low elevel security...!
    // const hashPass = btoa(req?.body?.password);
    // const obj = { ...req?.body };
    // obj.password = hashPass;

    // High level security...!
    const hashPass = await bcrypt.hash(req?.body?.password, 10);
    const obj = { ...req?.body };
    obj.password = hashPass;

    const newUser = new UserModal(obj);
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
};

// Login user api controller...!
const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // 400
    if (!email || !password) {
      return res?.status(400).send({
        status: false,
        message: "Email and password required",
      });
    }

    // 404:
    const isUserExist = await UserModal.findOne({ email });
    if (!isUserExist) {
      return res?.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    // 401
    // const decodePass = atob(isUserExist?.password);
    const decodePass = await bcrypt.compare(password, isUserExist?.password);
    console.log(`Decode: ${decodePass}`);

    if (!decodePass) {
      return res?.status(401).send({
        status: false,
        message: "Password is invalid",
      });
    }

    // 200

    // Generating token
    const token = jwt.sign(
      {
        userName: isUserExist?.userName,
        uid: isUserExist?._id + new Date().getTime(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );

    return res?.status(200).send({
      status: true,
      message: "Log In Success",
      data: isUserExist,
      token: token,
    });
  } catch (error) {
    console.log("Server err in login api: ", error);
    return res?.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

// Feth all users api controller...!
const fetchAllUsers = async (req, res) => {
  try {
    const counts = await UserModal.countDocuments();
    console.log(`Counts: ${counts}`);

    // 400
    if (counts < 1) {
      return res?.status(400).send({
        status: false,
        message: "No user found",
      });
    }

    // 200
    const users = await UserModal.find({}).select("-password");
    return res?.status(200).send({
      status: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(`Server Err: ${error}`);
    return res?.status(500).send({
      status: 500,
      message: "Internal server error",
    });
  }
};

export { welcomeToDB, createUser, logInUser, fetchAllUsers };
