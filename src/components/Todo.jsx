import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import TodoItems from "./Todoitems";

const Todo = () => {
  const inputRef = useRef("");
  const todo_data = localStorage.getItem("todoData")
    ? JSON.parse(localStorage.getItem("todoData"))
    : [];
  const [todoText, setTodoText] = useState(todo_data);
  const [editId, setEditId] = useState(null);

  const addOrUpdateTask = () => {
    const text = inputRef.current.value.trim();
    if (text === "") {
      return alert("Please enter a task");
    }

    if (editId) {
      setTodoText((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, text } : item))
      );
      setEditId(null);
    } else {
      const data = {
        id: Date.now(),
        text: text,
        isComplete: false,
      };
      setTodoText((prev) => [...prev, data]);
    }

    inputRef.current.value = "";
  };

  const del = (id) => {
    setTodoText((prev) => prev.filter((item) => item.id !== id));
  };

  const toggle = (id) => {
    setTodoText((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  const edit = (id, text) => {
    setEditId(id);
    inputRef.current.value = text;
  };

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoText));
  }, [todoText]);

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Todo List</h1>
        <div className="todo">
          <div className="header">
            <input ref={inputRef} className="text" type="text" />
            <button onClick={addOrUpdateTask} className="addBtn">
              {editId ? "Update Task" : "Add Task"}
            </button>
          </div>
          <div className="task">
            {todoText.map((item) => (
              <TodoItems
                key={item.id}
                id={item.id}
                isComplete={item.isComplete}
                text={item.text}
                deleteTodo={del}
                toggle={toggle}
                edit={edit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
