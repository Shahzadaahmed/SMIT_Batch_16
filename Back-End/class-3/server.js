// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path, { join } from "path";
import { config } from "dotenv";
import conectMongoDB from "./src/database/db.js";
import nodemailer from "nodemailer";

// const customPath = path.join('uploads', 'images', "img123.png");
// console.log(`Path: ${customPath}`);

// Environment variables config...!
config({
  path: "./.env",
});

// Note: Database connection here...!
conectMongoDB();

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Global variables...!
const port = process.env.PORT;
const app = express();
// Saving file on their respective destination with file name...!
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    console.log(`File: ${file}`);
    const uniqueFileName = Date.now() + '-' + file.originalname;
    cb(null, uniqueFileName);
  }
});
// Multer config...!
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
});

// Middlewares...!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// app.post("/user/verify", (req, res) => {
//   try {
//     const { userEmail } = req?.body;
//     console.log("Email: ", userEmail);

//     // Provider email data...!
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.SENDER_PASSWORD
//       }
//     });

//     // Receiver data...!
//     const receiverDtails = {
//       from: process.env.SENDER_EMAIL,
//       to: userEmail,
//       subject: "Email Verification Step 2",
//       html: "Your OTP is 1234"
//     };

//     const sendEmail = transporter.sendMail(receiverDtails);
//     if (sendEmail) {
//       console.log(`Email send to ${userEmail} successfully!`);
//       return;
//     };
//   }

//   catch (error) {
//     console.log(`Something went wrong while sending email to user: ${error}`);
//   }
// });

// Multer wala kam
// app.post("/api/upload/file", upload.single('image'), (req, res) => {
//   console.log(`File: ${JSON.stringify(req?.file)}`);
//   try {
//     // 400
//     if (!req?.file) {
//       return res?.status(400).send({
//         status: false,
//         message: "File is required or No file receoved"
//       });
//     };

//     // 200
//     return res?.status(200).send({
//       status: true,
//       message: 'File uploaded succesfully'
//     });
//   }

//   catch (error) {
//     // 500
//     console.log(`Something went wrong while saving image: ${error}`);
//     return res?.status(500).send({
//       status: false,
//       message: "Internal server error"
//     });
//   }
// });

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


// Note: Main server file...!

// Importing libs...!
// import express from "express";
// import morgan from "morgan";
// import cors from "cors";
// import fs from "fs";
// import { config } from "dotenv";
// import conectMongoDB from "./src/database/db.js";

// import userRoutes from "./src/routes/user-routes/user-routes.js";

// // Environment variables config...!
// config({
//   path: "./.env",
// });

// // Note: Database connection here...!
// conectMongoDB();

// // Global variables...!
// const port = process.env.PORT;
// const app = express();

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// // Middlewares...!
// app.use(express.json());
// app.use(morgan("dev"));
// // app.use(cors());

// app.use("/user", userRoutes);

// // Server running...!
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });