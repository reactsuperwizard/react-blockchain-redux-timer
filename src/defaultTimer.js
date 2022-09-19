import { useState, useEffect } from "react";

export default function Timer({ endTime }) {
  const [timeState, setTimeState] = useState();
  const launchDate = new Date(endTime).getTime();
  const current = new Date().getTime();
  useEffect(() => {
    setTimeState((launchDate - current) / 1000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(function () {
      if (timeState < 1) {
        setTimeState(0);
      }
      setTimeState(timeState - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeState]);
  return (
    <div>
      <div className="timer">
        <div className="box-d">
          <span className="box-num">{secondsToTime(timeState).d}</span>
          <span className="box-title-d">D A Y S</span>
        </div>
        <div className="box-h">
          <span className="box-num">{secondsToTime(timeState).h}</span>
          <span className="box-title-h">H O U R S</span>
        </div>
        <div className="box-m">
          <span className="box-num">{secondsToTime(timeState).m}</span>
          <span className="box-title-m">M I N U T E S</span>
        </div>
        <div className="box-s">
          <span className="box-num">{secondsToTime(timeState).s}</span>
          <span className="box-title-s">S E C O N D S</span>
        </div>
      </div>
    </div>
  );
}

function secondsToTime(secs) {
  let days = Math.floor(secs / (60 * 60 * 24));

  let divisor_for_hours = secs % (60 * 60 * 24);
  let hours = Math.floor(divisor_for_hours / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}
