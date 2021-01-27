import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    padding: 0.8em 1em;
    border-radius: 4px;
    border-color: transparent;
    background-color: ${({theme}) => theme.colors.secondary};
    color: ${({theme}) => theme.colors.darkContrastText};
`;

export default Button;
