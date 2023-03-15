import { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import styled from "styled-components";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../UI/Spinner";
import useAppContext from "../../hooks/useAppContext";
import setAvatar from "../../utils/formatAvatar";
import { auth } from "../../app/firebase";
import { createConversation } from "../../app/service/conversationsService";
import { getUsers } from "../../app/service/usersService";
import { conversationsState } from "../../app/atoms/conversationsState";
import { CONVERSATION_VARIANTS } from "../../app/constants";
import { Conversation } from "../../types";

const UsersList = styled.ul`
  overflow-y: auto;
  padding: 0 15px;
`;

const UserItem = styled(motion.li)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  padding-left: 18px;
  border-radius: 10px;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${(props) => (props.disabled ? "unset" : props.theme.bgHover)};
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-right: auto;
`;

const Username = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const UserEmail = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`;

const Users: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ conversations }, setConversationsState] = useRecoilState(conversationsState);

  const { setSidebarOpen, username, setUsername, setUsersVisible, setUsersLoading } =
    useAppContext();

  const isTablet = useMediaQuery("(max-width: 768px)");

  const [users, setUsers] = useState<User[]>([]);

  const [conversationUserId, setConversationUserId] = useState("");

  const onClearUsers = () => {
    setUsername("");
    setUsersVisible(false);
  };

  const getExistingUsers = async () => {
    if (!currentUser) {
      return;
    }
    setUsersLoading(true);
    try {
      const users = await getUsers(currentUser.uid);
      const validUsers = users.filter((user) => user.displayName) as User[];
      setUsers(validUsers);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setUsersLoading(false);
  };

  const onCreateConversation = async (user: User) => {
    if (conversationUserId || !currentUser) {
      return;
    }
    const existingConversation = conversations.find((conversation) =>
      conversation.participantIds.includes(user.uid)
    );
    if (existingConversation) {
      setConversationsState((prev) => ({
        ...prev,
        currentConversation: existingConversation,
      }));
      onClearUsers();
      if (isTablet) {
        setSidebarOpen(false);
      }
      return;
    }
    setConversationUserId(user.uid);

    const conversation: Conversation = {
      id: uuidv4(),
      participantIds: [currentUser.uid, user.uid],
      latestMessage: {
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        text: null,
      },
      hasCreatorSeenLatestMessage: true,
      hasParticipantSeenLatestMessage: false,
      creator: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      participant: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    try {
      await createConversation(conversation);
      setConversationsState((prev) => ({
        ...prev,
        currentConversation: conversation,
      }));
      onClearUsers();
      if (isTablet) {
        setSidebarOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setConversationUserId("");
  };

  const searchedUsers = useMemo(() => {
    if (!username) {
      return users;
    }
    return users.filter((user) =>
      user.displayName?.toLowerCase().includes(username.toLowerCase())
    );
  }, [username, users]);

  useEffect(() => {
    getExistingUsers();
  }, []);

  return (
    <>
      <h2 className="visually-hidden">Users</h2>
      <UsersList>
        {searchedUsers.map((user) => {
          const conversationCreating = conversationUserId === user.uid;
          const { uid, displayName, email } = user;
          return (
            <UserItem
              key={uid}
              variants={CONVERSATION_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              disabled={conversationCreating}
              onClick={() => onCreateConversation(user)}
            >
              {setAvatar(user)}
              <UserWrapper>
                <Username>{displayName}</Username>
                <UserEmail>{email}</UserEmail>
              </UserWrapper>
              {conversationCreating ? <Spinner /> : null}
            </UserItem>
          );
        })}
      </UsersList>
    </>
  );
};

export default Users;
