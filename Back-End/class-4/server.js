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

const usersData = {};

io.on("connect", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // socket.emit('welcome', `A user has been connected and it's id is ${socket.id}`);

  // socket.on("read-message", (data) => {
  //   console.log(`Message received at server: ${data}`);
  // });

  socket.on("register", (userId) => {
    console.log(`User id: ${userId}`);
    usersData[userId] = socket.id; // Saving users...!
    console.log("Users: ", usersData);
  });

  socket.on('private-msg', ({ to, message }) => {
    console.log(`To: ${to} - Message: ${message}`);

    const targetSocket = usersData[to];

    if (targetSocket) {
      io.to(targetSocket).emit("private-msg", {
        message,
        from: socket.id
      });
    }

    else console.log('Target user not found!');
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Server running...!
httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});