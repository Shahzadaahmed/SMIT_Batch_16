// Main page component...!

"use client";

import React, { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5050", { autoConnect: false });

const App = () => {
  const handleSubmit = () => {
    socket.emit("private-msg", {
      to: "user_1",
      message: "Hello TTS 456"
    });
  };

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected: ', socket.id);
    });

    socket.emit("register", "user_2");

    return () => {
      socket.off('connect');
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
