import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import QuizBase from '../../src/components/QuizBase';
import Widget from '../../src/components/Widget';
import BackLinkArrow from '../../src/components/BackLinkArrow';

export default function QuizDaGaleraPage({ dbExterno, name }) {
  return dbExterno ? (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizBase db={dbExterno} name={name} />
    </ThemeProvider>
  ) : (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h1>Esse DB ainda não foi disponibilizado.</h1>
      </Widget.Header>
    </Widget>
  );
}

QuizDaGaleraPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dbExterno: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export async function getServerSideProps({ query: { id, name } }) {
  let dbExterno = null;

  const [user, repoName] = id.split('__');

  try {
    const res = await fetch(`https://${repoName}.${user}.vercel.app/api/db`);

    if (!res.ok) {
      throw new Error('Falha em pegar os dados');
    } 

    dbExterno = await res.json();
  } catch (error) {
    console.log(error);
  }

  return {
    props: { dbExterno, name },
  };
}
