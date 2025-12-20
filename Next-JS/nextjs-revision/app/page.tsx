// Main page component...!

"use client";

import React from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();

  const navigationHandler = () => {
    router.push("./about/profile");
  };

  return (
    <div>
      <h1> Welcome to Next JS </h1>
      <button onClick={navigationHandler}> Go to profile </button>
    </div>
  );
};

export default App;
