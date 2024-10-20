import { useQuiz } from "../QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();

  return (
    <div>
      <p className="text-2xl mt-7 mb-3">{questions[index].question}</p>
      <div className="flex flex-col gap-2">
        <Options />
      </div>
    </div>
  );
}

export default Question;
