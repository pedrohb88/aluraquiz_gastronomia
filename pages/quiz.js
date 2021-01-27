import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuestionWidget from '../src/components/QuestionWidget';

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
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setcorrectAnswers] = useState(0);

  const [resultMessage, setResultMessage] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (selectedAnswer === null) return alert('Selecione alguma alternativa!');

    if (parseInt(selectedAnswer, 10) === question.answer) {
      setcorrectAnswers(correctAnswers + 1);
    }
    setSelectedAnswer(null);

    const nextQuestionIndex = questionIndex + 1;

    if (nextQuestionIndex >= totalQuestions) {
      const correctPercentage = (correctAnswers / totalQuestions) * 100;

      let message = '';
      if (correctPercentage < 20) {
        message = `${name}, você ainda não conhece tanto de cozinha, mas nada que bons programas de culinária não resolvam.`;
      } else if (correctPercentage < 50) {
        message = `${name}, você tem certo domínio sobre a cozinha, e quando precisa sabe botar a mão na massa.`;
      } else if (correctPercentage < 80) {
        message = `${name}, você conhece quase tudo sobre culinária e manda ver na cozinha.`;
      } else {
        message = `Ora ora, parece que temos um(a) possível chefe aqui. ${name}, você conhece de tudo no mundo da culinária, e já está mais do que acostumado(a) a fazer maravilhas na cozinha.`;
      }

      setResultMessage(message);

      setScreenState(screenStates.RESULT);
    } else {
      setQuestionIndex(nextQuestionIndex);
    }
  };

  const onAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
            question={question} 
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={onSubmit}
            onAnswerChange={onAnswerChange}
          />
        )}

        {screenState === screenStates.RESULT && (
          <Widget>
            <Widget.Header>
              <h1>Resultado</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{`Você acertou ${correctAnswers} de ${totalQuestions} questões.`}</p>
              <p>{resultMessage}</p>
            </Widget.Content>
          </Widget>
        )}

      </QuizContainer>
    </QuizBackground>
  );
}

export const getServerSideProps = ({ query }) => ({ props: { name: query.name } });

Quiz.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Quiz;
