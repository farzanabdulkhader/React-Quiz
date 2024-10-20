import "./Progress.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";
import { useQuiz } from "../QuizContext";

function App() {
  const { totalQuesNum, totalPoints, index, securedMarks } = useQuiz();

  return (
    <div className="mt-8">
      <ProgressBar
        className="custom-progress w-full h-2"
        now={index + 1}
        max={totalQuesNum}
      />
      <div className="flex justify-between mt-2 text-xl">
        <p>
          Question <b>{index + 1}</b>/{totalQuesNum}
        </p>
        <p>
          <b>{securedMarks}</b>/{totalPoints}
        </p>
      </div>
    </div>
  );
}

export default App;
