import { DELETE_GOAL, FETCH_GOALS, UPDATE_GOAL } from "./goalActions";

const initialState = {
  goals: [],
};

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GOALS:
      return {
        ...state,
        goals: action.payload,
      };

    case UPDATE_GOAL:
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.id ? action.payload : goal
        ),
      };

    case DELETE_GOAL:
      console.log("delete goal", action.payload);
      return {
        ...state,
        goals: state.goals.filter((goal) => goal._id !== action.payload),
      };

    default:
      return state;
  }
};

export default goalReducer;
