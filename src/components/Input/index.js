import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    margin-bottom: 10%;
    padding: 0.8em 1em;
    border-radius: 4px;
    border: 0.1em solid ${({ theme }) => theme.colors.primary};
    background-color: rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.contrastText};
`;

export default Input;
