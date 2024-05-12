import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultsPage.css'; // Import CSS file for styling

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state ? location.state.score : 0;
  const totalQuestions = location.state ? location.state.totalQuestions : 0;

  // Handle retry button click
  const handleRetry = () => {
    navigate('/'); // Redirect to the test page
  };

  return (
    <div className="results-container">
      <h2>Quiz Completed</h2>
      <p className="result">Total Score: {score}</p>
      <p className="result">Total Questions: {totalQuestions}</p>
      <button className="retry-button" onClick={handleRetry}>Retry</button>
    </div>
  );
};

export default ResultsPage;



