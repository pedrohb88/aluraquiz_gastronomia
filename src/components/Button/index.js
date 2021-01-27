import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    padding: 0.8em 1em;
    border-radius: 4px;
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.darkContrastText};
    cursor: pointer;
    transition: .2s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.lightContrastText};
    }

    &:disabled {
        background-color: grey;
        color: ${({ theme }) => theme.colors.darkContrastText};
        cursor: auto;
    }
`;

export default Button;
