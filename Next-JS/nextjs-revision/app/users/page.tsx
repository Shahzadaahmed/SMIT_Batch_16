"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Users = () => {
  const router = useRouter();
  const [usersList, setUsersList] = useState([]);

  const fetchUsers = async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";

    try {
      const res = await fetch(apiUrl);
      const jsonData = await res?.json();
      console.log("Users: ", jsonData);
      jsonData && setUsersList(jsonData);
    } catch (error) {
      console.log("Something went wrong while fetching users: ", error);
    }
  };

  const viewUser = (user: any) => {
    console.log(user);
    router.push(`/users/${user?.id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1> Users </h1>
      <ul>
        {usersList?.map((item: any) => {
          return (
            <li key={item?.id}>
              {item?.name}
              <button onClick={() => viewUser(item)}> View </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
