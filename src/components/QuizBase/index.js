import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import QuizBackground from '../QuizBackground';
import QuizContainer from '../QuizContainer';
import QuizLogo from '../QuizLogo';
import QuestionWidget from '../QuestionWidget';
import ResultWidget from '../ResultWidget';
import Loader from '../Loader';

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

function QuizBase({ db, name }) {
  const totalQuestions = db.questions.length;

  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  const [screenState, setScreenState] = useState(screenStates.QUIZ);
  
  const [results, setResults] = useState([]);

  /* useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []); */

  const submitAnswer = async (selectedAnswer) => {
    const isCorrect = parseInt(selectedAnswer, 10) === question.answer;

    setResults([
      ...results,
      isCorrect,
    ]);
   
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex >= totalQuestions) {
      setScreenState(screenStates.RESULT);
    } else {
      setQuestionIndex(nextQuestionIndex);
    }
  };

  return (
    <>
      {screenState === screenStates.LOADING && <Loader />}
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <>
              <QuestionWidget 
                question={question} 
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}
                submitAnswer={submitAnswer}
              />
            </>
          )}

          {screenState === screenStates.RESULT && (
            <ResultWidget 
              results={results} 
              name={name} 
              totalQuestions={db.questions.length} 
            />
          )}

        </QuizContainer>
      </QuizBackground>
    </>
  );
}

QuizBase.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  db: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default QuizBase;
