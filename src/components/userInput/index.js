import "./inputStyle.scss";
import AlphaInput from "./input";
import { useState, useRef, useEffect } from "react";
function UserInput() {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [runningTime, setRunningTime] = useState(0);
  const [state, setState] = useState(false);
  const [timer, setTimer] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const alphaInput = useRef(null);
  const [isfirstEvent, setIsFirstEvent] = useState(true);

  const arrange = (isReversed) => {
    if (isReversed) {
      const reversed = alphabets.split("").reverse();
      return [reversed, new Array(reversed.length)];
    }
    const regular = alphabets.split("");
    return [regular, new Array(regular.length)];
  };

  let [arrangedAlpha, setArrangedAlpha] = useState(arrange());
  /**
   * start and stop timer
   * @param {start time of first key press} startTime
   */
  const handleTimer = (startTime) => {
    if (state) {
      clearInterval(timer);
      setState(false);
    } else {
      const timer = setInterval(() => {
        setRunningTime(Date.now() - startTime);
        console.log(`timer`, timer);
      });
      setTimer(timer);
      setState(true);
    }
  };

  useEffect(() => {
    foucsInput();
  }, []);

  const getCharColor = (status) => {
    switch (status) {
      case true:
        return "valid";
      case false:
        return "invalid";
      default:
        return "";
    }
  };

  const foucsInput = () => {
    alphaInput.current.focus();
  };

  const resetTimer = () => {
    clearInterval(timer);
    setTimer(0);
    setRunningTime(0);
    setState(false);
    setIsFirstEvent(true);
    console.log(`asd`, timer, state, runningTime);
  };

  /**
   * set timer
   */
  const reset = () => {
    resetTimer();
    setArrangedAlpha(arrange());
    setTextInput("");
    setIsCompleted(false);
    foucsInput();
  };

  return (
    <>
      <div className="d-flex justify-center flex-column">
        <h1 className="d-flex justify-center uppercase">Type to start</h1>
        <div className="d-flex justify-center">
          <h2 className="width">{runningTime / 1000}'s</h2>
        </div>
      </div>
      <div className="d-flex justify-center flex-wrap">
        {arrangedAlpha[0].map((character, index) => (
          <span
            className={`char ${getCharColor(arrangedAlpha[1][index])}`}
            key={`apha${index}`}
          >
            {character}
            {arrangedAlpha[1][index]}
          </span>
        ))}
      </div>
      <AlphaInput
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
        value={textInput}
        setValue={setTextInput}
        handleTimer={handleTimer}
        reset={reset}
        arrangedAlpha={arrangedAlpha}
        setArrangedAlpha={setArrangedAlpha}
        alphaInput={alphaInput}
        isfirstEvent={isfirstEvent}
        setIsFirstEvent={setIsFirstEvent}
      ></AlphaInput>
      <div className="d-flex justify-center mt-3">
        <button onClick={() => reset()}>Reset</button>
      </div>

      <div className="how">
        <div className="box">
          <h4>How to play:</h4>
          <div>
            You have to type albhabets in sequence and mesure the time how fast
            you can type.
          </div>
          <div>Compete with you and with friends and Enjoy :-)</div>
        </div>
      </div>
    </>
  );
}

export default UserInput;
