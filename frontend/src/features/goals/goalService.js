import axios from 'axios'
import { create_Goal } from '../../constants'
const createGoal = async (goalData, token) => {
    const response = axios.post(create_Goal, goalData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

export const goalService = {
    createGoal
}