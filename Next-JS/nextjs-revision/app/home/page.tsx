// Home Screen...!

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [todoInput, setTodoInput] = useState("");

  // Get Data...!
  const handleGetTodoData = async () => {
    try {
      const apiUrl = "http://localhost:5050/todo/fetch-all";
      const res = await axios.get(apiUrl);
      console.log("Fetch todos data: ", res);
      const { status, data } = res;

      if (status) {
        setTodos(data?.data || []);
      }
    } catch (error) {
      console.log("Err while fetching todos: ", error);
    }
  };

  // Post Data...!
  const handleAddTodo = async () => {
    const obj = { todoValue: todoInput.trim() };
    console.log("Obj: ", obj);

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5050/todo/add",
        data: obj,
      });
      console.log("Post api res: ", res);
      const { status, data } = res;
      if (status) {
        setTodoInput("");
        handleGetTodoData();
      }
    } catch (error) {
      console.log("Err while adding todo: ", error);
    }
  };

  // Delete Data...!
  const handleDelete = async (key: number) => {
    console.log("Li to delete: ", key);

    try {
      let res = await axios({
        method: "DELETE",
        url: `http://localhost:5050/todo/delete/${key}`,
      });

      const { status, data } = res;
      if (status) {
        alert("Item deleted");
        handleGetTodoData();
      }
    } catch (error) {
      console.log("Err while deleting data: ", error);
    }
  };

  // Mounted hook...!
  useEffect(() => {
    handleGetTodoData();
  }, []);

  return (
    <div>
      <h1> Full Stack Todo App </h1>
      <input
        type="text"
        placeholder="Add Todo"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button onClick={handleAddTodo}> Add Item </button>

      {todos.length < 1 && <h1> No Data Found </h1>}

      <ul>
        {todos?.map((item: string, index: number) => {
          return (
            <li key={index}>
              {item}
              <button onClick={() => handleDelete(index)}> Delete Item </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
