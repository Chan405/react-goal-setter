export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userData");
  dispatch(logout());
};
