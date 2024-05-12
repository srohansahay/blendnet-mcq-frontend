import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

const Home: React.FC = () => (
  <div className="home-container">
    <h1>Welcome to the Home Page</h1>
    <div className="button-container">
      <Link to="/testquestions" className="btn btn-primary">Start Test</Link>
      <Link to="/questions" className="btn btn-secondary">Configure Questions</Link>
    </div>
  </div>
);

export default Home;
