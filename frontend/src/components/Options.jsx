import { useState } from "react";
import { useQuiz } from "../QuizContext";

const correctAnswerSound = new Audio("correct.mp3");
const wrongAnswerSound = new Audio("wrong.mp3");

function Options() {
  const { questions, index, dispatch, isAnswered } = useQuiz();
  const [selectedOption, setSelectedOption] = useState(null);

  const correctOption =
    questions[index].options[questions[index].correctOption];

  const getOptionStyle = (option) => {
    if (!isAnswered) return "border-gray-800 bg-gray-800";

    if (isAnswered && selectedOption !== option && option === correctOption) {
      return "border-[var(--green)] bg-[var(--dark)]";
    }

    if (isAnswered && selectedOption === option) {
      return option === correctOption
        ? "border-[var(--green)] bg-[var(--dark)] translate-x-4"
        : "border-red-600 bg-[var(--dark)] translate-x-4";
    } else if (isAnswered && selectedOption !== option) {
      return "border-gray-800 bg-gray-800";
    }
  };

  const handleSelect = (option) => {
    let marks = 0;
    setSelectedOption(option);

    if (option === correctOption) {
      marks = questions[index].points;
      correctAnswerSound.play();
    } else {
      marks = 0;
      wrongAnswerSound.play();
    }
    dispatch({ type: "answer", payload: marks });
  };

  return (
    <div
      className={` ${
        isAnswered && "cursor-not-allowed pointer-events-none"
      } flex flex-col space-y-1`}
    >
      {questions[index].options.map((option, i) => (
        <div
          className={`cursor-pointer w-full h-12 border-2 text-left p-4 flex items-center rounded-full text-xl hover:translate-x-4 hover:border-2 hover:border-gray-800 transition-all hover:bg-[var(--dark)] duration-300 ${getOptionStyle(
            option
          )} text-red-500
          }`}
          key={i}
          onClick={!isAnswered ? () => handleSelect(option) : null}
        >
          <p>{option}</p>
        </div>
      ))}
    </div>
  );
}

export default Options;
