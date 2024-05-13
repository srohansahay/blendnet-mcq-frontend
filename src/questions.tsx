import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Question } from './types';
import questionsData from './questionsdata.json';
import QuestionComponent from './components/question';
import QuestionEditorComponent from './components/QuestionEditorComponent'; // Import the QuestionsEditor component

const Questions: React.FC = () => {

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Fetch questions from backend server when the component mounts
    fetch('http://34.16.160.151:5000/api/questions/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then(data => {
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  return (
    <div>

      <Link to="/">Go to home page</Link>
      <h1>List of Questions</h1>
      <QuestionEditorComponent /> {/* Render the QuestionsEditor component */}
      {questions.map((question: Question) => (
        <QuestionComponent key={question.id} question={question} showCorrectOption={true} />
      ))}
    </div>
  );
};

export default Questions;

