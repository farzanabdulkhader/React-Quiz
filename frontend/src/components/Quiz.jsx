import { useQuiz } from "../QuizContext";
import Footer from "./Footer";
import Progress from "./Progress";
import Question from "./Question";
import Result from "./Result";

function Quiz() {
  const { questions, index } = useQuiz();
  return (
    <>
      {index > questions.length - 1 ? (
        <Result />
      ) : (
        <div className="w-[32rem] m-auto mt-6">
          <Progress />
          <Question />
          <Footer />
        </div>
      )}
    </>
  );
}

export default Quiz;
