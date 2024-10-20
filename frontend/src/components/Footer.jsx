import { useQuiz } from "../QuizContext";
import Button from "./Button";
import Timer from "./Timer";

function Footer() {
  const { dispatch, questions, index, isAnswered } = useQuiz();

  const handleNext = () => {
    dispatch({ type: "next", payload: questions[index].points });
  };
  return (
    <div className="flex justify-between mt-4">
      <Timer />
      {isAnswered && (
        <Button size="small" onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  );
}

export default Footer;
