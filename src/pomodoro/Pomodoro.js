import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Header from "./Duration-Header/Header";
import Timer from "./Time-Body/Timer";
import Session from "./Time-Body/Session";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * function to update the session state with the next session type upon timeout.
 * @param currentSessionLabel
 *    The current session label
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(currentSessionLabel, focusDuration, breakDuration) {
  return currentSessionLabel === "Focusing"
    ? {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      }
    : {
        label: "Focusing",
        timeRemaining: focusDuration * 60,
      };
}

function Pomodoro() {
  const initialPomodoroState = {
    running: false,
    session: null,
    duration: {
      focus: 25,
      pause: 5,
    },
  };

  const [pomodoroState, setPomodoroState] = useState({
    ...initialPomodoroState,
  });

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (pomodoroState.session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setPomodoroState((currentState) => ({
          ...currentState,
          session: nextSession(
            currentState.session.label,
            currentState.duration.focus,
            currentState.duration.pause
          ),
        }));
      }
      return setPomodoroState((currentState) => ({
        ...currentState,
        session: nextTick(currentState.session),
      }));
    },
    pomodoroState.running ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setPomodoroState((currentState) => {
      const nextRunning = !currentState.running;
      const modifications = {
        ...currentState,
        running: nextRunning,
      };

      if (nextRunning && !currentState.session) {
        modifications.session = {
          label: "Focusing",
          timeRemaining: currentState.duration.focus * 60,
        };
      }

      return modifications;
    });
  }

  return (
    <div className="pomodoro">
      <Header
        duration={pomodoroState.duration}
        session={pomodoroState.session}
        setPomodoroState={setPomodoroState}
      />
      <Timer
        playPause={playPause}
        running={pomodoroState.running}
        setPomodoroState={setPomodoroState}
        session={pomodoroState.session}
      />
      <Session state={pomodoroState} />
    </div>
  );
}

export default Pomodoro;