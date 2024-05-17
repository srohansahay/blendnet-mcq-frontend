import React from 'react';
import { Question } from '../types'; // Import the type/interface for questions
import './QuestionComponent.css'
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { db } from '../firebase';

interface QuestionProps {
  question: Question;
  index: number;
  onOptionSelect?: (option: string) => void; // Include onOptionSelect function
  showCorrectOption? : boolean
}

const QuestionComponent: React.FC<QuestionProps> = ({ question,index, onOptionSelect, showCorrectOption }) => {
  const { title, options, correct_option, url, id } = question;

  const handleOptionClick = (option: string) => {
    if(onOptionSelect) {onOptionSelect(option);}
    else {
      console.log(option);
    }
     // Call the onOptionSelect function when an option is clicked
  };

  const handleDeleteClick = async () => {
    try {
      await deleteDoc(doc(db, 'questions', question.id));
      console.log('Deleted the question with id: ' + question.id);
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="question-container">
   
      <div className="question-title">
        <h2>Q{index+1}. {title}</h2>
        <div onClick={handleDeleteClick} hidden={!showCorrectOption}>Delete question</div>
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
