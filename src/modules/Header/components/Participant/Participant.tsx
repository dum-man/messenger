import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { setFormattedUser } from "../../../../utils";
import { auth } from "../../../../firebase";

const Wrapper = styled.p`
  span {
    margin-right: 10px;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const Participant: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { currentConversation } = useRecoilValue(conversationsState);

  return (
    <Wrapper>
      <span>To:</span>
      {setFormattedUser(currentConversation, currentUser?.uid)?.displayName}
    </Wrapper>
  );
};

export default Participant;
