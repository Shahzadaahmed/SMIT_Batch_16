// Note: Main server file...!

// Importing libs...!
import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Global variables...!
const port = 5050;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

// Middlewares...!
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

io.on("connect", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.emit('welcome', `A user has been connected and it's id is ${socket.id}`);

  socket.on("read-message", (data) => {
    console.log(`Message received at server: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Server running...!
httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
