import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Question } from './types';
import QuestionComponent from './components/question';
import QuestionEditorComponent from './components/QuestionEditorComponent'; // Import the QuestionsEditor component
import { db } from './firebase';
import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot } from 'firebase/firestore/lite';

const Questions: React.FC = () => {

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {

    const fetchQuestions = async () => {
      try {
        const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc')); // Order by createdAt timestamp in descending order
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        const data: Question[] = [];
        querySnapshot.forEach((doc) => {
          const questionData = doc.data() as Question;
          data.push({
            id: doc.id,
            title: questionData.title,
            options: questionData.options,
            url: questionData.url,
            correct_option: questionData.correct_option,
          });
        });
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <Link to="/">Go to home page</Link>
      <h1>List of Questions</h1>
      <QuestionEditorComponent />
      {questions.map((question: Question, index: number) => (
        <QuestionComponent key={question.id} question={question} index={index} showCorrectOption={true} />
      ))}
    </div>
  );
};

export default Questions;

