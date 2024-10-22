import { useEffect, useState } from "react";
import { useQuiz } from "../QuizContext";
import Button from "./Button";
import confetti from "canvas-confetti";

function Result() {
  const { dispatch, securedMarks } = useQuiz();
  const [highscore, setHighscore] = useState(null);

  const percentage = Math.floor((securedMarks / 280) * 100);

  const handleRestartQuiz = () => {
    dispatch({ type: "restart" });
  };

  useEffect(() => {
    const successSound = new Audio("success.mp3");
    successSound.preload = "auto";
    const winSound = new Audio("win.mp3");
    winSound.preload = "auto";
    const looseSound = new Audio("loose.mp3");
    looseSound.preload = "auto";

    const fetchHighScore = async () => {
      try {
        const res = await fetch(
          "https://react-quiz-6usq.onrender.com/highscore"
        );
        const data = await res.json();
        setHighscore(data.highscore);

        if (percentage > 50 && securedMarks > data.highscore) {
          triggerConfetti();
          successSound.play();
        } else if (percentage > 35) {
          triggerConfetti();
          winSound.play();
        } else if (percentage < 25) {
          looseSound.play();
        }
      } catch (error) {
        console.error("Failed to fetch highscore:", error);
      }
    };
    fetchHighScore();
  }, [securedMarks, percentage]);

  useEffect(() => {
    const updateHighscore = async () => {
      try {
        if (securedMarks > highscore) {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/highscore`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ highscore: securedMarks }),
            }
          );
          const data = await res.json();
          setHighscore(data.highscore);
        }
      } catch (err) {
        console.log("Failed to update highscore:", err.message);
      }
    };
    if (highscore !== null) {
      updateHighscore();
    }
  }, [securedMarks, highscore]);

  // Confetti function
  const triggerConfetti = () => {
    confetti({
      particleCount: 150, // Number of confetti pieces
      spread: 70, // Spread of confetti
      origin: { y: 0.6 }, // Start point of confetti (lower down)
    });
  };

  return (
    <div className="mt-20">
      <div className="bg-[var(--green)] p-3 rounded-full text-2xl font-bold">
        <p className="text-[var(--dark)]">
          {`${
            percentage > 25 ? "🏆" : "😓"
          } You scored ${securedMarks} out of 280 (${percentage}%)`}
        </p>
      </div>
      <p className="mt-6 text-xl mb-12">{`( Highscore: ${highscore} )`}</p>
      <div className="text-right">
        <Button size="large" onClick={handleRestartQuiz}>
          Restart Quiz
        </Button>
      </div>
    </div>
  );
}

export default Result;
