import React, { useState, useEffect } from 'react';
import './Quiz.css';

function Quiz({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
    const [seconds, setSeconds] = useState(15); // Initialize timer to 15 seconds

    useEffect(() => {
        // If seconds reach 0, stop the timer and play a noise
        if (seconds === 0) {
            return;
        }

        // Set up a timer to countdown
        const interval = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [seconds]);



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
                setSeconds(15); // Reset the timer for the next question
            } else {
                setShowScore(true);
            }
        }, 3000);
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
        <div>
        <div className="timer">
            <h1>
                Time: {seconds}s
            </h1>
        </div>
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
        </div>
    );
}

export default Quiz;
