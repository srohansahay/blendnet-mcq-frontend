import './App.css';
import Home from './Home.tsx';
import Questions from './questions.tsx';
import TestQuestion from './components/TestQuestion.tsx';
import {Route, Routes} from 'react-router-dom';
import Results from './ResultsPage.tsx';
import Timesup from './Timesup.tsx';
import React from 'react';

function App() {
  return (
    <div className="App">      
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="questions" element={<Questions/>}/>
      <Route path="testquestions" element={<TestQuestion />} />
      <Route path="timesup" element={<Timesup />} />
      <Route path="/quiz-completed" element={<Results/>} />
     </Routes>
    </div>
  );
}

export default App;
