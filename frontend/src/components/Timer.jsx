import { useState, useEffect } from "react";
import { useQuiz } from "../QuizContext";

function Timer() {
  const { dispatch } = useQuiz();

  const initialTime = 7 * 60 + 30;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (timeRemaining <= 0) dispatch({ type: "finish" });

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  // Calculate minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    <div className="rounded-full text-[#fafafa] text-xl px-4 py-2 border-gray-700 border-2">
      <p>{formattedTime}</p>
    </div>
  );
}

export default Timer;
