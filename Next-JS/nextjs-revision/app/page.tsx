// Main page component...!

"use client";

import React, { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5050", { autoConnect: false });

const App = () => {
  const handleSubmit = () => {
    socket.emit('read-message', 'Hello from client Next JS');
  };

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected: ', socket.id);
    });

    socket.on("welcome", (data) => {
      console.log('Message received from server: ', data);
    });

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
