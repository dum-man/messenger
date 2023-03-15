import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Users from "../Users/Users";
import Conversations from "../Conversations/Conversations";
import UserInfo from "../UserInfo/UserInfo";
import SetUserData from "../Sliders/SetUserData";
import SearchInput from "../SearchInput/SearchInput";
import useAppContext from "../../hooks/useAppContext";
import { auth } from "../../app/firebase";

const Container = styled.section<{ open: boolean }>`
  width: 380px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bgSecondary};
  border-right: 0.5px solid ${({ theme }) => theme.borderSecondary};
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
  @media (max-width: 768px) {
    width: ${(props) => (props.open ? "100%" : "unset")};
    display: ${(props) => (props.open ? "flex" : "none")};
  }
`;

const Sidebar: React.FC = () => {
  const [currentUser, loading] = useAuthState(auth);

  const { sidebarOpen, usersVisible } = useAppContext();

  const [userDataOpen, setUserDataOpen] = useState(false);

  useEffect(() => {
    if (!currentUser?.displayName && !loading) {
      setUserDataOpen(true);
    }
  }, [loading]);

  return (
    <Container open={sidebarOpen}>
      <SearchInput />
      {usersVisible ? <Users /> : <Conversations />}
      <UserInfo />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {userDataOpen && <SetUserData setOpen={setUserDataOpen} />}
      </AnimatePresence>
    </Container>
  );
};

export default Sidebar;
