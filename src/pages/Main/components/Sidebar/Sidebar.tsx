import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import SearchUsers from "../../../../modules/SearchUsers";
import Users from "../../../../modules/Users";
import Conversations from "../../../../modules/Conversations";
import UserInfo from "../../../../modules/UserInfo";
import SetUserData from "../../../../modules/SetUserData";
import Logout from "../../../../modules/Logout";
import useAppContext from "../../../../hooks/useAppContext";

const Container = styled.section<{ open: boolean }>`
  width: 380px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bgSecondary};
  border-right: 0.5px solid ${({ theme }) => theme.borderSecondary};
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
  @media (max-width: 768px) {
    width: ${({ open }) => (open ? "100%" : "unset")};
    display: ${({ open }) => (open ? "flex" : "none")};
  }
`;

const Sidebar: React.FC = () => {
  const { sidebarOpen, setUserDataOpen, usersVisible } = useAppContext();

  const [logOutOpen, setLogOutOpen] = useState(false);

  return (
    <Container open={sidebarOpen}>
      <SearchUsers />
      {usersVisible ? <Users /> : <Conversations />}
      <UserInfo setLogoutOpen={setLogOutOpen} />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {setUserDataOpen && <SetUserData />}
        {logOutOpen && <Logout setOpen={setLogOutOpen} />}
      </AnimatePresence>
    </Container>
  );
};

export default Sidebar;
