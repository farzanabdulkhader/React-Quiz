import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  status: "",

  questions: [],
  securedMarks: 0,
  index: 0,
  isAnswered: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };
    case "ready":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };
    case "start":
      return { ...state, status: "start" };
    case "finish":
      return { ...state, status: "finish" };
    case "next": {
      return {
        ...state,
        index: state.index + 1,

        isAnswered: false,
      };
    }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "answer":
      return {
        ...state,
        isAnswered: true,
        securedMarks: state.securedMarks + action.payload,
      };
    default:
      return state;
  }
};

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, securedMarks, index, isAnswered } = state;

  useEffect(() => {
    dispatch({ type: "loading" });
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "https://react-quiz-6usq.onrender.com/questions"
        );
        const data = await res.json();
        dispatch({ type: "ready", payload: data.questions });
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        dispatch({ type: "error", payload: error.message });
      }
    };
    fetchQuestions();
  }, []);

  const totalQuesNum = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        dispatch,
        totalQuesNum,
        totalPoints,
        index,
        securedMarks,
        isAnswered,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside the QuizProvider");

  return context;
};

export { QuizProvider, useQuiz };
