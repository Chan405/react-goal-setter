const baseUrl = process.env.REACT_APP_BASE_URL;
export const login = `${baseUrl}/api/v1/users/login`
export const register = `${baseUrl}/api/v1/users`;
export const getGoals = `${baseUrl}/api/v1/goals`;
export const getUserInfo = `${baseUrl}/api/v1/users/me`;
export const create_Goal = `${baseUrl}/api/v1/goals`;

