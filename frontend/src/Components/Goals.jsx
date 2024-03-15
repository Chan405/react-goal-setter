import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getGoals } from '../constants';
import SingleGoal from './SingleGoal';
function Goals() {
    const [goals, setGoals] = useState([]);
    const token = localStorage.getItem('TOKEN');

    const fetchGoals = async () => {
        const {data} = await axios.get(getGoals, {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        });

        if(data && data.length > 0) {
            setGoals(data)
        }
    }
    useEffect(() => {
        fetchGoals()
    }, [])

    console.log(goals)
  return (
    <>
    {goals.length > 0 && goals.map( goal => <SingleGoal key={goal.id} goal={goal}/>)}
    </>
  )
}

export default Goals