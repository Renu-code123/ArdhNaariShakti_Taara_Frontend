import React, { useState } from "react";
import quizData from "../../assets/data/quizData";
import "./quiz.css";
import Confetti from "react-confetti";

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

  const retryQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  const feedbackMessage =
    score > quizData.length / 2 ? "Great job!" : "Keep learning!";

  return (
    <div className="quiz-container">
      {showResult && <Confetti />}
      <div className="quiz-header">
        <h1>Interactive Quiz</h1>
        <p>Test your knowledge about transgender rights and laws!</p>
      </div>
      {showResult ? (
        <div className="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>{feedbackMessage}</p>
          <p>
            Your Score: {score} / {quizData.length}
          </p>
          <p>🎉 You earned {score} stars! 🎉</p>
          <button className="retry-button" onClick={retryQuiz}>
            Retry Quiz
          </button>
          <button
            className="share-button"
            onClick={() => alert("Share your score on social media!")}
          >
            Share Score
          </button>
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
