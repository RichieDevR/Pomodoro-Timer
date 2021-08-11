import React from "react";
import classNames from "../../../utils/class-names";

function Timer({ running, playPause, session, setPomodoroState }) {
  const resetSession = () => {
    setPomodoroState((currentState) => {
      return { ...currentState, running: false, session: null };
    });
  };

  return (
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !running,
                "oi-media-pause": running,
              })}
            />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="stop"
            title="Stop the session"
            onClick={resetSession}
            disabled={!session}
          >
            <span className="oi oi-media-stop" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
