const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    // Add user to goal model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text to set goal"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("goal", goalSchema);
