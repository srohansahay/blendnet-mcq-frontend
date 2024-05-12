import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import questionsdata from '../questionsdata.json';
import { Question } from '../types';

const QuestionEditorComponent: React.FC = () => {
  const [formData, setFormData] = useState<Question>({
    id: '',
    title: '',
    url: '',
    options: ['', '', '', ''],
    correct_option: '',
  });

  const [isEditOn, setIsEditOn] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

const handleSubmit = async () => {
  try {
    const newQuestionWithId = { ...formData, id: uuidv4() }; // Include a UUID for the new question
    const response = await fetch('https://34.16.160.151:5000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newQuestion: newQuestionWithId }),
    });
    if (response.ok) {
      console.log('Question added successfully.');
      setFormData({
        id: '',
        title: '',
        url: '',
        options: ['', '', '', ''],
        correct_option: '',
      });
      setIsEditOn(false);
      // Optionally, perform any additional actions (e.g., reset form, display success message)
    } else {
      console.error('Failed to add question:', response.statusText);
      // Handle error (e.g., display error message to user)
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle error (e.g., display error message to user)
  }
};


  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      options: prevData.options.map((opt, idx) => (idx === index ? value : opt))
    }));
  };
  

  return (
    <div>
    <button onClick={()=>setIsEditOn(!isEditOn)}>Add question</button> 
    {isEditOn ? 
    <div className="question-container">
      <div className="question-title">
      <label>Question: </label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div className="audio-container">
        <label>URL: </label>
        <input type="text" name="url" value={formData.url} onChange={handleChange} />
      </div>
      <div className="options">
  {formData.options.map((option, index) => (
    <div key={index} className="option">
      <label>{`Option ${index + 1}:`}</label>
      <input
        type="text"
        name={`options[${index}]`}
        value={option}
        onChange={(e) => handleChangeOption(e, index)}
      />
    </div>
  ))}
</div>
      <div className="correct-option">
        <label>Correct Option: </label>
        <input type="text" name="correct_option" value={formData.correct_option} onChange={handleChange} />
      </div>
      <button className="submit-form-btn" onClick={handleSubmit}>Submit</button>
    </div> : null}
    </div>
  );
};

export default QuestionEditorComponent;

