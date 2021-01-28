import React from 'react';
import PropTypes from 'prop-types';
import db from '../../../db.json';

import Widget from '../Widget';

function ResultWidget({ results, name }) {
  const totalQuestions = db.questions.length;
  const correctAnswers = results.filter((r) => r).length;
  
  const correctPercentage = (correctAnswers / totalQuestions) * 100;
  
  let message = '';
  if (correctPercentage < 50) {
    message = `${name}, você ainda não conhece tanto de cozinha, mas nada que bons programas de culinária não resolvam.`;
  } else if (correctPercentage < 80) {
    message = `${name}, você tem certo domínio sobre a cozinha, e quando precisa sabe botar a mão na massa.`;
  } else if (correctPercentage < 100) {
    message = `${name}, você conhece quase tudo sobre culinária e manda ver na cozinha.`;
  } else {
    message = `Ora ora, parece que temos um(a) possível chefe aqui. ${name}, você conhece de tudo no mundo da culinária, e já está mais do que acostumado(a) a fazer maravilhas na cozinha.`;
  }
  
  return (
    <Widget>
      <Widget.Header>
        <h1>Resultado</h1>
      </Widget.Header>
      <Widget.Content>
        <p>{`Você acertou ${correctAnswers} de ${totalQuestions} questões.`}</p>
        <p>{message}</p>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  results: PropTypes.array.isRequired,
};

export default ResultWidget;
