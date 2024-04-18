import React, { useState } from 'react';
import './Quiz.css'; // Ensure you link to the correct CSS file

function Quiz({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);


    const handleAnswerOptionClick = (isCorrect, index) => {
        setSelectedAnswer(index);
        setIsAnswerRevealed(true);

        if (isCorrect) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setIsAnswerRevealed(false);
            } else {
                setShowScore(true);
            }
        }, 3000); // 2 seconds to view the result
    };

    function getButtonClass(index, isCorrect, selectedAnswer, isAnswerRevealed) {
        if (!isAnswerRevealed) return '';
        if (index === selectedAnswer) {
            return isCorrect ? 'correct' : 'incorrect';
        }
        if (isCorrect) {
            return 'correct';
        }
        return '';
    }



    return (
        <div className="quiz">
            {showScore ? (
                <div className="score-section">
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <div className="question-container">
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className="question-text emoji">{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button
                                key={index}
                                className={`answer-card ${getButtonClass(index, answerOption.isCorrect, selectedAnswer, isAnswerRevealed)}`}
                                onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}
                                disabled={isAnswerRevealed}
                            >
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
