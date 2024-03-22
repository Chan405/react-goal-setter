const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoals = asyncHandler(async (request, response) => {
  try {
    const goals = await Goal.find({ user: request.user.id });

    response.status(200).json(goals);
  } catch (e) {
    console.log({ e });
    response.status(400).json({ message: "unknown error" });
  }
});

const setGoals = asyncHandler(async (request, response) => {
  if (!request.body.text) {
    response.status(400).json({ message: "Enter a text to set goal" });
  }
  const { text } = request.body;

  try {
    const goal = await Goal.create({
      text,
      user: request.user.id,
    });
    response.status(200).json(goal);
  } catch (e) {
    console.log({ e });
    response.status(400).json({ message: "unknown error" });
  }
});

const updateGoal = asyncHandler(async (request, response) => {
  if (!request.body.text) {
    response.status(400).json({ message: "Enter a text to set goal" });
  }
  try {
    const goal = await Goal.findById(request.params.id);
    if (goal) {
      const loggedInUser = await User.findById(request.user.id);

      //check if logged in user id equals with goal user id
      if (goal.user.toString() !== loggedInUser.id.toString()) {
        response
          .status(401)
          .json({ message: "Not aunthorized to update the goal" });
      } else {
        const updatedGoal = await Goal.findByIdAndUpdate(
          goal.id,
          request.body,
          {
            new: true,
          }
        );
        response.status(200).json(updatedGoal);
      }
    }
  } catch (err) {
    response.status(400).json({ message: "Goal not found" });
  }
});

const deleteGoal = asyncHandler(async (request, response) => {
  try {
    const goalId = request.params.id;

    const goal = await Goal.findById(goalId);
    const loggedInUser = await User.findById(request.user.id);

    if (!goal) {
      response.status(400);
      throw new Error("Goal not found");
    }

    if (goal.user.toString() !== loggedInUser.id.toString()) {
      response
        .status(401)
        .json({ message: "Not aunthorized to delete the goal" });
    } else {
      await goal.deleteOne({ id: goalId });
      response.status(200).json({ id: request.params.id });
    }
  } catch (e) {
    console.log(e);
    response
      .status(400)
      .json({ message: "Could not remove the goal", id: request.params.id });
  }
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
