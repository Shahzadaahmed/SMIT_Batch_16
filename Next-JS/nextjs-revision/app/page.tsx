// Main page component...!

"use client";

import React, { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5050", { autoConnect: false });

const App = () => {
  const handleSubmit = () => {
    socket.emit("read", "Hello from Front End Next JS");
  };

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    // Targeting welcome...!
    socket.on("welcome", (data) => {
      console.log("Message from the server: ", data);
    });

    // When unmount...!
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1> Socket.io with Next JS </h1>
      <button onClick={handleSubmit}> Submit </button>
    </div>
  );
};

export default App;
