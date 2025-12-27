// Note: Main server file...!

// const express = require('express');

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotEnv from "dotenv";

// Global variables...!
const port = 3000;
const app = express();

// Middlewares...!
app.use(express.json());
app.use(morgan());
app.use(cors());

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
