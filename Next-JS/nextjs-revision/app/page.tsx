// Main page component...!

"use client";

import React, { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5050", { autoConnect: false });

const App = () => {

  const handleSubmit = () => {
    // socket.emit('read-message', 'Hello from client Next JS');
    socket.emit("private-msg", {
      to: "user_2",
      message: "Hello testing 123"
    });
  };

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected: ', socket.id);
    });

    // socket.on("welcome", (data) => {
    //   console.log('Message received from server: ', data);
    // });

    socket.emit("register", "user_1");

    socket.on('private-msg', (msgData) => {
      console.log('Message received FE: ', msgData);
    });

    return () => {
      socket.off('connect');
      socket.off('private-msg');
      socket.disconnect();
    }
  }, []);

  return (
    <div>
      <h1> Socket.io with Next JS </h1>
      <button onClick={handleSubmit}> Submit </button>
    </div>
  );
};

export default App;
