import React, { useState } from 'react';
import Category from './components/category';
import Quiz from './components/quiz';
import { categories } from './data';

function App() {
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setCurrentCategory(category);
  };

  return (
      <div className="App">
        {currentCategory ? (
            <Quiz questions={currentCategory.questions} />
        ) : (
            <Category categories={categories} onSelect={handleCategorySelect} />
        )}
      </div>
  );
}

export default App;
