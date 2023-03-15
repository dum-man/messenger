import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import AppLayout from "../../layouts/AppLayout/AppLayout";
import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import Notification from "../../components/Notification/Notification";
import DeleteConversation from "../../components/Sliders/DeleteConversation";
import useAppContext from "../../hooks/useAppContext";
import { conversationsState } from "../../app/atoms/conversationsState";
import { auth } from "../../app/firebase";

const Main: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ currentConversation, conversations }, setConversationsState] =
    useRecoilState(conversationsState);

  const { deleteWindowOpen } = useAppContext();

  const [newNotificationOpen, setNewNotificationOpen] = useState(false);

  const onResetNotificationConversation = () => {
    setConversationsState((prev) => ({
      ...prev,
      notificationConversation: null,
    }));
  };

  useEffect(() => {
    const latestConversation = conversations.find((conversation) =>
      conversation.creator.uid === currentUser?.uid
        ? !conversation.hasCreatorSeenLatestMessage
        : !conversation.hasParticipantSeenLatestMessage
    );
    if (!latestConversation || latestConversation.id === currentConversation?.id) {
      return;
    }
    setConversationsState((prev) => ({
      ...prev,
      notificationConversation: latestConversation,
    }));
    setNewNotificationOpen(true);
    const timeout = setTimeout(() => {
      setNewNotificationOpen(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
      setNewNotificationOpen(false);
    };
  }, [conversations]);

  return (
    <AppLayout>
      <h1 className="visually-hidden">Messenger</h1>
      <Sidebar />
      <Chat />
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={onResetNotificationConversation}
      >
        {newNotificationOpen && <Notification />}
        {deleteWindowOpen && <DeleteConversation />}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Main;
