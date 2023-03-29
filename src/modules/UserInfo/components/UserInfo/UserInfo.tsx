import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar } from "../../../../ui";
import { auth } from "../../../../firebase";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 15px;
  border-top: 0.5px solid ${({ theme }) => theme.borderPrimary};
  transition: border-color 0.2s;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Username = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const Email = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`;

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 5px;
  font-size: 24px;
  border-radius: 50%;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.2s, transform 0.1s;
  &:active {
    transform: scale(0.9);
  }
`;

interface UserInfoProps {
  setLogoutOpen: (open: React.SetStateAction<boolean>) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ setLogoutOpen }) => {
  const [currentUser] = useAuthState(auth);

  return (
    <Wrapper>
      <Avatar user={currentUser} />
      <UserWrapper>
        <Username>{currentUser?.displayName}</Username>
        <Email>{currentUser?.email}</Email>
      </UserWrapper>
      <LogoutButton onClick={() => setLogoutOpen(true)}>
        <span className="visually-hidden">Log out</span>
        <IoLogOutOutline />
      </LogoutButton>
    </Wrapper>
  );
};

export default UserInfo;
