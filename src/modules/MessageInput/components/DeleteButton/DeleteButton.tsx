import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import useAppContext from "../../../../hooks/useAppContext";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 30px;
  height: 30px;
  padding: 0;
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 50%;
  transition: color 0.2s, transform 0.1s;
  &:active {
    transform: scale(0.9);
  }
`;

const DeleteButton: React.FC = () => {
  const { setDeleteWindowOpen } = useAppContext();

  return (
    <Button type="button" onClick={() => setDeleteWindowOpen(true)}>
      <span className="visually-hidden">Delete conversation</span>
      <AiOutlineDelete />
    </Button>
  );
};

export default DeleteButton;
