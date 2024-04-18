import React, { useState } from 'react';
import Category from './components/category';
import Quiz from './components/quiz';
import { categories } from './data';

function App() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);


  function getRandomQuestions(questions, numQuestions = 10) {
    // Shuffle array using the Durstenfeld shuffle algorithm
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    // Return the first numQuestions elements
    return questions.slice(0, numQuestions);
  }

  const handleCategorySelect = (category) => {
    // Get 10 random questions from the selected category
    const selectedQuestions = getRandomQuestions([...category.questions]);
    setQuizQuestions(selectedQuestions);
    setCurrentCategory(category);
  };


  return (
      <div className="App">
        {currentCategory ? (
            <Quiz questions={quizQuestions} />
        ) : (
            <Category categories={categories} onSelect={handleCategorySelect} />
        )}
      </div>
  );
}

export default App;
