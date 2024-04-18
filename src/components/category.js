import React from 'react';
import './Category.css';  // Ensure you link to the correct CSS file

function Category({ categories, onSelect }) {
    return (
        <div className="category-container">
            {categories.map((category) => (
                <div key={category.id} className="card" onClick={() => onSelect(category)}>
                    {category.name}
                </div>
            ))}
        </div>
    );
}

export default Category;
