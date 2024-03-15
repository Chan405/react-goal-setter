import React, { useState } from "react";

function GoalForm({ createGoal }) {
  const [text, setText] = useState("");

  return (
    <section className="form">
      <form
        onSubmit={(e) => {
          if (text.trim().length > 0) {
            e.preventDefault();
            createGoal(text);
            setText("");
          }
        }}
      >
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            className={
              text.trim().length === 0
                ? "btn-disabled  btn-block"
                : "btn btn-block"
            }
            type="submit"
            disabled={text.trim().length === 0}
          >
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
