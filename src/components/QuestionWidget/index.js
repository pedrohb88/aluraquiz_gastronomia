import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';
import Button from '../Button';
import AlternativesForm from '../AlternativesForm';

function QuestionWidget({
  question, totalQuestions, questionIndex, submitAnswer,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
 
  const isAlternativeSelected = selectedAnswer !== undefined;
  const shouldDisableButton = (!isQuestionSubmited && !isAlternativeSelected) || isQuestionSubmited;
  const isCorrect = parseInt(selectedAnswer, 10) === question.answer;

  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h1>
      </Widget.Header>
      <img 
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        
        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setIsQuestionSubmited(true);

          setTimeout(() => {
            submitAnswer(selectedAnswer);
            setIsQuestionSubmited(false);
            setSelectedAnswer(undefined);
          }, 3 * 1000);
        }}
        >
          <fieldset disabled={isQuestionSubmited ? 'disabled' : null} style={{ padding: 0, margin: 0, border: 'none' }}>
            {question.alternatives.map((alternative, index) => {
              const alternativeIndex = `question__${questionIndex}__alternative__${index}`;

              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = parseInt(selectedAnswer, 10) === index;

              return (
                <Widget.Topic 
                  key={alternativeIndex}
                  as="label"
                  htmlFor={alternativeIndex}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input 
                    style={{ display: 'none' }}
                    id={alternativeIndex} 
                    type="radio"
                    name={`question__${questionIndex}`}
                    value={index}
                    onChange={() => {
                      setSelectedAnswer(index);
                    }}
                  />
                  {alternative}
                </Widget.Topic>
              
              );
            })}
          </fieldset>

          <Button disabled={shouldDisableButton} type="submit">
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  ); 
}
  
QuestionWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  submitAnswer: PropTypes.func.isRequired,
};

export default QuestionWidget;
