import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleGoal from "./SingleGoal";
import GoalForm from "./GoalForm";
import { useDispatch, useSelector } from "react-redux";
import { goalsApi } from "../constants";
import { deleteGoal } from "../features/goals/goalActions";
function Goals() {
  const [goals, setGoals] = useState([]);
  const { token } = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const config = {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  };

  const fetchGoals = async () => {
    const { data } = await axios.get(goalsApi, config);

    if (data && data.length > 0) {
      setGoals(data);
    }
  };

  const createGoal = async (text) => {
    const { data } = axios.post(goalsApi, { text }, config);
    fetchGoals();
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <>
      <GoalForm createGoal={createGoal} />
      {goals.length > 0 &&
        goals.map((goal) => <SingleGoal key={goal.id} goal={goal} />)}

      {goals.length === 0 && (
        <p className="empty-goals"> No goals yet. Create a new goal</p>
      )}
    </>
  );
}

export default Goals;
