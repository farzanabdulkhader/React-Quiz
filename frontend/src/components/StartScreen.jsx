import { useQuiz } from "../QuizContext";
import Button from "./Button";

function StartScreen() {
  const { dispatch } = useQuiz();

  return (
    <div>
      <h1 className="text-5xl mb-10 mt-12">Welcome to the React Quiz!</h1>
      <p className="text-3xl mb-12">15 questions to test your React mastery</p>
      <Button size="large" onClick={() => dispatch({ type: "start" })}>
        Let&apos;s start
      </Button>
    </div>
  );
}

export default StartScreen;
