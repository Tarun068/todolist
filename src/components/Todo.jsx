import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import TodoItems from "./Todoitems";
const Todo = () => {
  const inputRef = useRef("");
  const todo_data = localStorage.getItem("todoData")
    ? JSON.parse(localStorage.getItem("todoData"))
    : [];
  const [todoText, setTodoText] = useState(todo_data);
  const add = () => {
    const text = inputRef.current.value.trim();
    if (inputRef.current.value === "") {
      return alert("please enter task");
    }
    const data = {
      id: Date.now(),
      text: text,
      isComplete: false,
    };
    setTodoText((prev) => [...prev, data]);
    inputRef.current.value = "";
  };
  const del = (id) => {
    setTodoText((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  const toggle = (id) => {
    setTodoText((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, isComplete: !item.isComplete };
        }
        return item;
      });
    });
  };
  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoText));
  }, [todoText]);
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1>Todo list</h1>
          <div className="todo">
            <div className="header">
              <input
                ref={inputRef}
                className="text"
                type="text"
                name=""
                id=""
              />
              <button onClick={add} className="addBtn">
                Add Task
              </button>
            </div>
            <div className="task">
              {todoText.map((item, index) => {
                return (
                  <TodoItems
                    key={index}
                    isComplete={item.isComplete}
                    text={item.text}
                    deleteTodo={del}
                    id={item.id}
                    toggle={toggle}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
