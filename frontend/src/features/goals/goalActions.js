export const DELETE_GOAL = "DELETE_GOAL";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const FETCH_GOALS = "FETCH_GOALS";

export const fetchGoals = (goals) => ({
  type: FETCH_GOALS,
  payload: goals,
});

export const deleteGoal = (goalId) => ({
  type: DELETE_GOAL,
  payload: goalId,
});

export const updateGoal = (goal) => ({
  type: UPDATE_GOAL,
  payload: goal,
});
