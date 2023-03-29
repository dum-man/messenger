import styled from "styled-components";
import { IoMdArrowRoundUp } from "react-icons/io";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 0;
  width: 30px;
  height: 30px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.brand100};
  border-radius: 50%;
  transition: transform 0.1s;
  svg {
    color: #ffffff;
    border-radius: 50%;
  }
  :active {
    transform: scale(0.9);
  }
`;

interface SendButtonProps {
  onSendMessage: () => Promise<void>;
}

const SendButton: React.FC<SendButtonProps> = ({ onSendMessage }) => {
  return (
    <Button type="button" onClick={onSendMessage}>
      <span className="visually-hidden">Send message</span>
      <IoMdArrowRoundUp />
    </Button>
  );
};

export default SendButton;
