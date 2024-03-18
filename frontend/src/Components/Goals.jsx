import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleGoal from "./SingleGoal";
import GoalForm from "./GoalForm";
import { useSelector } from "react-redux";
import { goalsApi } from "../constants";
import { errorHandler } from "../utils/errorHandler";
function Goals() {
  const [goals, setGoals] = useState([]);
  const { token } = useSelector((state) => state.auth.userData);

  const config = {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  };

  const fetchGoals = async () => {
    try {
      const { data } = await axios.get(goalsApi, config);

      if (data && data.length > 0) {
        setGoals(data);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  const createGoal = async (text) => {
    try {
      const { data } = await axios.post(goalsApi, { text }, config);
      fetchGoals();
    } catch (e) {
      errorHandler(e);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const { data } = await axios.delete(`${goalsApi}/${goalId}`, config);
      setGoals(goals.filter((goal) => goal._id !== goalId));
    } catch (e) {
      errorHandler(e);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <>
      <GoalForm createGoal={createGoal} />
      {goals.length > 0 &&
        goals.map((goal) => (
          <SingleGoal
            key={goal.id}
            goal={goal}
            deleteGoal={deleteGoal}
            fetchGoals={fetchGoals}
          />
        ))}

      {goals.length === 0 && (
        <p className="empty-goals"> No goals yet. Create a new goal</p>
      )}
    </>
  );
}

export default Goals;
