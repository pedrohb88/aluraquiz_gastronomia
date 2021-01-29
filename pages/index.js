import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Link from '../src/components/Link';
import Loader from '../src/components/Loader';

const ExternalQuizList = styled.ul`
  max-height: 200px;
  overflow-y: auto;
`;

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    router.push(`/quiz?name=${name}`);
  };

  return (
    <>
      <ToastContainer 
        position="top-center"
        hideProgressBar
      />
      {loading && <Loader />}
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            variants={{
              show: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>Culinária</h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                Já assistiu todas as temporadas de masterchef e tá se 
                achando o rei ou a rainha da cozinha? Teste os seus 
                conhecimentos culinários e divirta-se!
              </p>
              <form onSubmit={onSubmit}>
                <Input 
                  placeholder="Diga seu nome!" 
                  onChange={onChange} 
                />
                <Button type="submit" disabled={name.length === 0}>Jogar</Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget
            as={motion.section}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.5,
            }}
          >
            <Widget.Content>
              <h1>Quizes da galera</h1>
              <ExternalQuizList>
            
                {db.external.map((url) => {
                  const prepareUrl = url
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '');

                  const [repoName, user] = prepareUrl.split('.');

                  return (
                    <li key={url}>
                      
                      <Widget.Topic 
                        onClick={(e) => {
                          if (name.length === 0) {
                            e.preventDefault();
                            return toast('Preencha seu nome, por favor!');
                          }

                          setLoading(true);
                        }}
                        as={Link}
                        href={`/quiz/${user}__${repoName}?name=${name}`}
                      >
                        {`${user}/${repoName}`}
                      </Widget.Topic>
                    
                    </li>
                  );
                })}
            
              </ExternalQuizList>
            </Widget.Content>
          </Widget>

          <Footer
            as={motion.footer}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
            transition={{
              delay: 1,
            }}
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/pedrohb88" />
      </QuizBackground>
    </>
  );
}
