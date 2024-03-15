import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function SingleGoal({ goal }) {
  return (
    <div className="goal">
      {goal.text}
      <FaEdit className="edit-icons"/>
      <FaTrashAlt className="delete-icons" />
    </div>
  );
}

export default SingleGoal;
