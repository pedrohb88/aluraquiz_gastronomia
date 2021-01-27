import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';

function Quiz({ name }) {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <h1>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>Bem vindo(a)!</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Olá, {name}! Bora começar?</p>
            </Widget.Content>
          </Widget>
        </QuizContainer>
      </h1>
    </QuizBackground>
  );
}

Quiz.getInitialProps = ({ query }) => ({ name: query.name });

export default Quiz;
