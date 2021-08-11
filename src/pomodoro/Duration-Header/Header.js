import React from "react";
import DurationIncrement from "./DurationIncrement";

function Header({ duration: { focus, pause }, session, setPomodoroState }) {
  const updateDuration = (id, offset, { min, max }) => {
    setPomodoroState((currentState) => {
      return {
        ...currentState,
        duration: {
          ...currentState.duration,
          [id]: Math.min(
            Math.max(currentState.duration[id] + offset, min),
            max
          ),
        },
      };
    });
  };

  return (
    <div className="row">
      <div className="col">
        <DurationIncrement
          id={"focus"}
          label="focus"
          name="Focus"
          duration={focus}
          range={{ min: 5, max: 60 }}
          increment={5}
          session={session}
          updateDuration={updateDuration}
        />
      </div>
      <div className="col">
        <div className="float-right">
          <DurationIncrement
            id="pause"
            label="break"
            name="Break"
            duration={pause}
            range={{ min: 1, max: 15 }}
            session={session}
            increment={1}
            updateDuration={updateDuration}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;