import React, { useState } from "react";
import quizData from "../../assets/data/quizData";
import "./quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      localStorage.setItem("quizScore", score + 1);
    }
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>
            Your Score: {score} / {quizData.length}
          </p>
          <p>🎉 You earned {score} stars! 🎉</p>
        </div>
      ) : (
        <div className="quiz-question">
          <h2>{quizData[currentQuestion].question}</h2>
          <div className="quiz-options">
            {quizData[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Quiz;
