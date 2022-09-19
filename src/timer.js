import { useState, useEffect } from "react";

export default function Timer({ startTime }) {
  const [timeState, setTimeState] = useState(24 * 60 * 60);
  const [start, setStart] = useState("");
  const current = new Date().getTime();

  useEffect(() => {
    if (startTime) {
      setStart(startTime);
      if (typeof startTime == "string") {
        const parseStTime = Date.parse(startTime);
        const differ = (current - parseStTime) / 1000;
        setTimeState(24 * 60 * 60 - differ);
      } else {
        const parseStTime = Date.parse(startTime.toDateString());
        const differ = (current - parseStTime) / 1000;
        setTimeState(24 * 60 * 60 - differ);
      }
    } else {
      setTimeState(24 * 60 * 60);
    }
  }, [startTime]);

  useEffect(() => {
    const timer = setTimeout(function () {
      if (!start) {
        setTimeState(24 * 60 * 60);
      }
      if (start) {
        setTimeState(timeState - 1);
      }
      if (timeState < 1) {
        setStart("");
        setTimeState(24 * 60 * 60);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeState, start]);
  return (
    <div>
      <div className="timer">
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
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}
