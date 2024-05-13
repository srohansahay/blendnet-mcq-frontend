import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionComponent from './question';
import { Question } from '../types';
import questionsData from '../questionsdata.json';

const TestQuestion: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsTimerRunning(false);
      if (timeLeft === 0) {
        // Timer expired, navigate to /timesup
        navigate('/timesup');
      }
    }

    return () => clearTimeout(timer);
  }, [isTimerRunning, timeLeft, navigate]);

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions[currentQuestionIndex] = option;
      return newOptions;
    });
  };

  const handleSubmit = () => {
   // Handle submission logic here
   if (selectedOptions[currentQuestionIndex] !== null) {
     if (currentQuestionIndex < questions.length - 1) {
       // Navigate to the next question
       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
       setTimeLeft(15); // Reset timer for the next question
       setIsTimerRunning(true); // Start timer for the next question
       // Increment score if the selected option is correct
       if (selectedOptions[currentQuestionIndex] === questions[currentQuestionIndex].correct_option) {
         const updatedScore = score + 1; // Increment the score
         setScore(updatedScore); // Update the score state
         console.log(updatedScore); // Log the updated score
       }
     } else {
       // All questions completed, navigate to results page with the score
       const finalScore = selectedOptions.reduce((acc, option, index) => {
         if (option === questions[index].correct_option) {
           return acc + 1;
         }
         return acc;
       }, 0);
       navigate('/quiz-completed', { state: { score: finalScore, totalQuestions: questions.length} });
     }
   }
 };
 
  return (
    <div>
        
      {questions.length > 0 ? (
        <>
          <QuestionComponent
            question={questions[currentQuestionIndex]}
            onOptionSelect={handleOptionSelect}
          />
          <p>Time left: {timeLeft} seconds</p>
          <button onClick={handleSubmit} disabled={!selectedOptions[currentQuestionIndex]}>
            Submit
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestQuestion;
