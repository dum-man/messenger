import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 100%;
  min-height: 30px;
  max-height: 55px;
  padding: 0 20px;
  font-family: inherit;
  font-size: 15px;
  color: ${({ theme }) => theme.textPrimary};
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.inputPrimary};
  border-radius: 30px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  -webkit-appearance: none;
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s;
  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

export default Input;
