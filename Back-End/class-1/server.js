// Note: Main server file...!

// const express = require('express');

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import users from "./src/dummy-data/dummy-data.js";

// Environment variables config...!
config({
  path: "./.env",
});

// Global variables...!
const port = process.env.PORT;
const app = express();
let todoBucket = []; // Database

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

// Create 2nd api: /users route(Feth all users)...!
app.get("/users", (req, res) => {
  try {
    // 400:
    if (users.length < 1) {
      return res.status(400).send({
        status: false,
        message: "No data found",
      });
    }

    // 200:
    return res.status(200).send({
      status: true,
      message: "Users list fetched successfully",
      data: users,
    });
  } catch (error) {
    // 500:
    return res.status(500).send({
      status: false,
      message: "Something went wrong from server side",
    });
  }
});

// Create 3rd api: /todo/add route(Send todo data to DB)...!
app.post("/todo/add", (req, res) => {
  const { todoValue } = req?.body;
  console.log(`Body data: ${todoValue}`);

  try {
    // 400:
    if (!todoValue) {
      return res.status(400).send({
        status: false,
        message: "Todo value is required.",
      });
    }

    // 200:
    const fetchTodos = [...todoBucket];
    fetchTodos.push(todoValue);
    todoBucket = fetchTodos;

    return res.status(200).send({
      status: true,
      message: "Todo added successfully",
    });
  } catch (error) {
    // 500:
    return res.status(500).send({
      status: false,
      message: "Server us not working!",
    });
  }
});

// Create 4th api: /todo/fetch-all route(Fetch all todo data from DB)...!
app.get("/todo/fetch-all", (req, res) => {
  try {
    // 400:
    if (todoBucket.length < 1) {
      return res.status(400).send({
        status: false,
        message: "No data found",
      });
    }

    // 200:
    const todos = [...todoBucket];
    return res.status(200).send({
      status: true,
      message: "Todo list fetched successfully",
      data: todos,
    });
  } catch (error) {
    // 500:
    return res.status(500).send({
      status: false,
      message: "Something went wrong from server side",
    });
  }
});

// Create 5th api: /todo/delete/:key route(Delete todo data from DB)...!
app.delete("/todo/delete/:key", (req, res) => {
  const { key } = req.params;
  console.log(`Key: ${key}`);

  try {
    const fetchTodos = [...todoBucket];
    fetchTodos.splice(key, 1);
    todoBucket = fetchTodos;

    return res.status(200).send({
      status: true,
      message: "Todo item deleted successfully",
    });
  } catch (error) {
    console.log(`Err while deleting data: ${error}`);
    return res?.status(500).send({
      status: false,
      message: "Server Err",
    });
  }
});

// Create 6th api: /todo/update route(Update todo data from DB)...!
app.put("/todo/update", (req, res) => {
  console.log(`Body: ${JSON.stringify(req.body)}`);
  const { key, updatedValue } = req?.body;

  try {
    if (!key || !updatedValue) {
      return res.status(400).send({
        status: false,
        message: "Key and updated are required!",
      });
    }

    const fetchTodos = [...todoBucket];
    fetchTodos.splice(key, 1, updatedValue);
    todoBucket = fetchTodos;

    return res.status(200).send({
      status: true,
      message: "Todo item updated successfully",
    });
  } catch (error) {
    console.log(`Err while updating data: ${error}`);
    return res?.status(500).send({
      status: false,
      message: "Server Err",
    });
  }
});

// Server running...!
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
