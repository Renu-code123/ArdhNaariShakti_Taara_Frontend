import React, { useState } from "react";
import quizData from "../../assets/data/quizData";
import "./quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (selectedOption) => {
    setSelectedOption(selectedOption);
    setTimeout(() => {
      if (selectedOption === quizData[currentQuestion].answer) {
        setScore(score + 1);
      }
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        localStorage.setItem("quizScore", score + 1);
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Interactive Quiz</h1>
        <p>Test your knowledge about transgender rights and laws!</p>
      </div>
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
              <button
                key={index}
                className={
                  selectedOption === option
                    ? option === quizData[currentQuestion].answer
                      ? "correct"
                      : "incorrect"
                    : ""
                }
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null}
              >
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
