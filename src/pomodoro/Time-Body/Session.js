import React from "react";
import { minutesToDuration, secondsToDuration } from "../../../utils/duration";

function Session({
  state: {
    duration: { focus, pause },
    session,
  },
}) {
  if (!session) return null;

  const startDurationMinutes = session.label === "Focusing" ? focus : pause;
  const startDurationSeconds = startDurationMinutes * 60;
  const currentDuration = session.timeRemaining;
  const difference = startDurationSeconds - currentDuration;
  const percentage =
    difference !== 0
      ? ((difference / startDurationSeconds) * 100).toFixed(2)
      : 0;

  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {session.label} for {minutesToDuration(startDurationMinutes)}{" "}
            minutes
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(currentDuration)} remaining
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={percentage}
              style={{ width: percentage + "%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Session;