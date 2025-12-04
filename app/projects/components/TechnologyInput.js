'use client';

import { useState } from 'react';

const PREDEFINED_TECHNOLOGIES = [
  'JavaScript',
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'Prisma',
  'PostgreSQL'
];

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [inputValue, setInputValue] = useState('');

  const addTechnology = (tech) => {
    const trimmedTech = tech.trim();
    if (trimmedTech && !technologies.includes(trimmedTech)) {
      onChange([...technologies, trimmedTech]);
      setInputValue('');
    }
  };

  const handleAdd = () => {
    addTechnology(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology(inputValue);
    }
  };

  const handleQuickAdd = (tech) => {
    addTechnology(tech);
  };

  const handleRemove = (indexToRemove) => {
    onChange(technologies.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <label htmlFor="technology-input">Technologies</label>
      <div>
        <input
          id="technology-input"
          type="text"
          placeholder="Type a technology and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
      
      <div>
        {PREDEFINED_TECHNOLOGIES.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => handleQuickAdd(tech)}
            disabled={technologies.includes(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      {error && <p className="error">{error}</p>}
      
      <div>
        {technologies.map((tech, index) => (
          <span key={index}>
            {tech}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              aria-label={`Remove ${tech}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}