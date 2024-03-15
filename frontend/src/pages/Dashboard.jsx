import React from 'react'
import Goals from '../Components/Goals';
import { FaTasks } from 'react-icons/fa';

function Dashboard() {
  return (
    <>
      <h1>
        {" "}
        <FaTasks /> Goals{" "}
      </h1>
      <Goals />
    </>
  );
}

export default Dashboard