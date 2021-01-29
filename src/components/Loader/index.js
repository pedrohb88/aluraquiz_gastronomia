import React from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import animationData from '../../lotties/loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  justify-content: center;
  z-index: 10000;
`;

function Loader() {
  return (
    <Overlay>
      <Lottie 
        options={defaultOptions}
        speed={2}
        width={150}
        height={150}
      />
    </Overlay>
  );
}

export default Loader;
