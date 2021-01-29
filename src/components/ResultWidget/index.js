import React from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';
import BackLinkArrow from '../BackLinkArrow';

function ResultWidget({ results, name, totalQuestions }) {
  const correctAnswers = results.filter((r) => r).length;
  
  const correctPercentage = (correctAnswers / totalQuestions) * 100;
  
  let message = '';
  if (correctPercentage < 50) {
    message = `${name}, você ainda não conhece tanto do assunto, mas nada que um pouco de estudo não resolva.`;
  } else if (correctPercentage < 80) {
    message = `${name}, você tem certo domínio sobre o assunto e está pronto(a) pra aprender ainda mais.`;
  } else if (correctPercentage < 100) {
    message = `${name}, você conhece quase tudo sobre o assunto e e consegue responder praticamente tudo que te perguntam sobre.`;
  } else {
    message = `Ora ora, parece que temos um(a) especialista aqui. ${name}, você domina o assunto por completo e não tem dúvidas sobre seu conhecimento.`;
  }
  
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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
  totalQuestions: PropTypes.number.isRequired,
};

export default ResultWidget;
