import React from 'react';
import PropTypes from 'prop-types';
import db from '../../db.json';

import QuizBase from '../../src/components/QuizBase';

function QuizPage({ name }) {
  return (
    <QuizBase db={db} name={name} />
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { name: query.name },
  };
}

QuizPage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default QuizPage;
