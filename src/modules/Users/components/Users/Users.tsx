import { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import { uuidv4 } from "@firebase/util";
import styled from "styled-components";
import toast from "react-hot-toast";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import UserItem from "../UserItem/UserItem";
import useAppContext from "../../../../hooks/useAppContext";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { createConversation, getUsers } from "../../api";
import { auth } from "../../../../firebase";
import { Conversation } from "../../../../types";

const UsersList = styled.ul`
  overflow-y: auto;
  padding: 0 15px;
`;

const Users: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ conversations }, setConversationsState] = useRecoilState(conversationsState);

  const { setSidebarOpen, username, setUsername, setUsersVisible, setUsersLoading } =
    useAppContext();

  const isTablet = useMediaQuery("(max-width: 768px)");

  const [users, setUsers] = useState<User[]>([]);

  const [creatingConversationId, setCreatingConversationId] = useState("");

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
    if (creatingConversationId || !currentUser) {
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
    setCreatingConversationId(user.uid);

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
    setCreatingConversationId("");
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
          return (
            <UserItem
              key={user.uid}
              user={user}
              conversationCreating={creatingConversationId === user.uid}
              onCreateConversation={onCreateConversation}
            />
          );
        })}
      </UsersList>
    </>
  );
};

export default Users;
