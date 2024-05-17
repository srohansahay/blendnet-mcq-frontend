import './App.css';
import Home from './Home';
import Questions from './questions';
import Test from './Test';
import TestQuestion from './components/TestQuestion';
import {Route, Routes} from 'react-router-dom';
import Results from './ResultsPage';
import Timesup from './Timesup';

function App() {
  return (
    <div className="App">      
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="questions" element={<Questions/>}/>
      <Route path="test" element={<Test/>}/>
      <Route path="testquestions" element={<TestQuestion />} />
      <Route path="timesup" element={<Timesup />} />
      <Route path="/quiz-completed" element={<Results/>} />
     </Routes>
    </div>
  );
}

export default App;
