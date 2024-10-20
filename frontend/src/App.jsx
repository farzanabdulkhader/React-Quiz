import { useQuiz } from "./QuizContext";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import StartScreen from "./components/StartScreen";
function App() {
  const { status } = useQuiz();
  return (
    <div className="text-center ">
      <Header />

      {status === "loading" && <Loader />}
      {status === "ready" && <StartScreen />}
      {status === "start" && <Quiz />}
      {status === "finish" && <Result />}
    </div>
  );
}

export default App;
