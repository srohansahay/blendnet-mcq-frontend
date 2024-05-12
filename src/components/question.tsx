import React from 'react';
import { Question } from '../types'; // Import the type/interface for questions
import './QuestionComponent.css'

interface QuestionProps {
  question: Question;
  onOptionSelect?: (option: string) => void; // Include onOptionSelect function
  showCorrectOption? : boolean
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, onOptionSelect, showCorrectOption }) => {
  const { title, options, correct_option, url } = question;

  const handleOptionClick = (option: string) => {
    if(onOptionSelect) {onOptionSelect(option);}
    else {
      console.log(option);
    }
     // Call the onOptionSelect function when an option is clicked
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://34.16.160.151:5000/api/questions/${question.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
         console.log('Deleted the question with id: '+question.id)
      } else {
        console.error('Failed to delete question:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="question-container">
   
      <div className="question-title">
        <h2>{title}</h2>
        <div onClick={handleDeleteClick}>Delete question</div>
      </div>
      {url && (
        <div className="audio-container">
          <div className="audio-player-wrapper">
            <audio src={url} controls></audio>
          </div>
        </div>
      )}
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className="option" onClick={() => handleOptionClick(option)}>
            {option}
          </div>
        ))}
      </div>
      {showCorrectOption && (
      <div className="correct-option-box">
        <span className="correct-option">Correct Option: </span><span>{correct_option}</span>
      </div> )
}
    </div>
  );
};

export default QuestionComponent;
