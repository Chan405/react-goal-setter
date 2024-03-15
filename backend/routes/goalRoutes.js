const express = require('express');
const router = express.Router();
const goalController = require("../controller/goalController");
const protect = require('../middleware/authMiddleware')

router.get('/', protect, goalController.getGoals)
router.post('/', protect, goalController.setGoals)
router.put('/:id', protect, goalController.updateGoal)
router.delete('/:id', protect, goalController.deleteGoal)

module.exports = router