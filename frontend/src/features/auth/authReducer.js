import { LOGIN_SUCCESS, LOGOUT } from "./authActions";

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export default userReducer;
