import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-weight: 700;
  color: #ffffff;
  background-color: ${({ theme }) => theme.brand200};
  border-radius: 30px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, transform 0.1s;
  &:disabled {
    cursor: not-allowed;
  }
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

export default Button;
