import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { goalsApi } from "../constants";

function GoalForm({ createGoal, isEditing }) {
  const { goalId } = useParams();
  const { state } = useLocation();
  const { token } = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  };

  const [text, setText] = useState(
    isEditing && state.goal ? state.goal.text : ""
  );

  const updateGoal = async (goalId, text) => {
    try {
      const { data } = await axios.put(
        `${goalsApi}/${goalId}`,
        { text },
        config
      );

      navigate("/");
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        console.log(e);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 0) {
      if (!isEditing) {
        createGoal(text);
        setText("");
      } else {
        updateGoal(goalId, text);
      }
    }
  };

  return (
    <section className="form">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            className={
              text.trim().length === 0
                ? "btn-disabled  btn-block"
                : "btn btn-block"
            }
            type="submit"
            disabled={text.trim().length === 0}
          >
            {goalId ? "Update Goal" : "Add Goal"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
