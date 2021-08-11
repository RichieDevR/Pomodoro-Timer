import React from "react";
import { minutesToDuration } from "../../utils/duration";

function DurationIncrement({
  id,
  label,
  name,
  duration,
  increment,
  range,
  session,
  updateDuration,
}) {
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid={"duration-" + label}>
        {name} Duration: {minutesToDuration(duration)}
      </span>
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-secondary"
          data-testid={"decrease-" + label}
          onClick={() => updateDuration(id, -increment, range)}
          disabled={!!session || range.min === duration}
        >
          <span className="oi oi-minus" />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid={"increase-" + label}
          onClick={() => updateDuration(id, +increment, range)}
          disabled={!!session || range.max === duration}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

export default DurationIncrement;
