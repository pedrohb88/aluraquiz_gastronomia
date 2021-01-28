import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuestionWidget from '../src/components/QuestionWidget';
import ResultWidget from '../src/components/ResultWidget';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h1>Carregando</h1>
      </Widget.Header>
      <Widget.Content>
        <p>Loading Spinner</p>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

function Quiz({ name }) {
  const totalQuestions = db.questions.length;

  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  const [screenState, setScreenState] = useState(screenStates.LOADING);
  
  const [results, setResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

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
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.LOADING && <LoadingWidget />}

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

        {screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}

      </QuizContainer>
    </QuizBackground>
  );
}

export const getServerSideProps = ({ query }) => ({ props: { name: query.name } });

Quiz.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Quiz;
