import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import { Question } from '../types';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';
import { db } from '../firebase';

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
      const newQuestion = { ...formData, id: uuidv4(),
        createdAt: serverTimestamp()
       }; // Generate a UUID for the new question
      await addDoc(collection(db, 'questions'), newQuestion); // Add the new question to Firestore
      console.log('Question added successfully.');
      setFormData({
        id: '',
        title: '',
        url: '',
        options: ['', '', '', ''],
        correct_option: '',
      });
      setIsEditOn(false);
      window.location.reload();
      // Optionally, perform any additional actions (e.g., reset form, display success message)
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

