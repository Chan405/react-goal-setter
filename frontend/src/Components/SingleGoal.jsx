import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import { goalsApi } from "../constants";
import { useSelector } from "react-redux";
import { errorHandler } from "../utils/errorHandler";

function SingleGoal({ goal, deleteGoal, fetchGoals }) {
  const [editedText, setEditedText] = useState(goal.text);
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useSelector((state) => state.auth.userData);
  const isSaveDisabled = editedText === goal.text;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const { data } = await axios.put(
        `${goalsApi}/${goal._id}`,
        { text: editedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGoals();
    } catch (e) {
      errorHandler(e);
    }
  };

  return (
    <div className={"goal"}>
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          autoFocus
        />
      ) : (
        <p>{goal.text}</p>
      )}

      <div className="goal-tools">
        <p className="time"> {moment(goal.createdAt).fromNow()}</p>

        {isEditing ? (
          <FaSave
            className="edit-icons"
            onClick={handleSave}
            style={{ opacity: isSaveDisabled ? 0.5 : 1 }}
          />
        ) : (
          <FaEdit className="edit-icons" onClick={handleEdit} />
        )}
        <FaTrashAlt
          className="delete-icons"
          onClick={() => deleteGoal(goal._id)}
        />
      </div>
    </div>
  );
}

{
  /* <Link to={`/goal/${goal._id}`} state={{ goal: goal }}>
          {" "}
          <FaEdit className="edit-icons" />
        </Link> */
}

export default SingleGoal;
