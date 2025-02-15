import React from "react";
import "./Todoitems.css";
import check from "../assets/checkbox.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import notCheck from "../assets/blank-check-box.png";
const TodoItems = ({ text, deleteTodo, id, toggle, isComplete }) => {
  return (
    <div className="todo-items">
      <div className="items-text" onClick={() => toggle(id)}>
        <img
          className="check-box"
          src={isComplete ? check : notCheck}
          alt="check"
        />
        <p>{text}</p>
      </div>
      <div className="delete-icon">
        <RiDeleteBin6Line onClick={() => deleteTodo(id)} fontSize={"25px"} />
      </div>
    </div>
  );
};

export default TodoItems;
