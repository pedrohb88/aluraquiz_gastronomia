import React from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';
import Button from '../Button';

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, onAnswerChange, 
}) {
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
        
        <form onSubmit={onSubmit}>
          {question.alternatives.map((alternative, index) => {
            const alternativeIndex = `question__${questionIndex}__alternative__${index}`;

            return (
              <Widget.Topic 
                key={alternativeIndex}
                as="label"
                htmlFor={alternativeIndex}
              >
                <input 
                  id={alternativeIndex} 
                  type="radio"
                  name={`question__${questionIndex}`}
                  value={index}
                  onChange={onAnswerChange}
                />
                {alternative}
              </Widget.Topic>
            
            );
          })}

          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  ); 
}
  
QuestionWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
};

export default QuestionWidget;
