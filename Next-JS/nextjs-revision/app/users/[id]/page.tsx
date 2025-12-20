"use client";

import React from "react";
import { useParams } from "next/navigation";

const ViewUser = () => {
  const { id } = useParams();
  console.log(`User id: ${id}`);

  return (
    <div>
      <h1> {`View User ${id}`} </h1>
    </div>
  );
};

export default ViewUser;
