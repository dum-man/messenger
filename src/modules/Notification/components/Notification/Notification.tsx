import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import NotificationContent from "../NotificationContent/NotificationContent";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { getLatestConversation } from "../../helpers";
import { auth } from "../../../../firebase";
import { VARIANTS } from "../../constants";

const Container = styled(motion.div)`
  position: fixed;
  top: 30px;
  left: calc(50% - 150px);
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const Notification: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ currentConversation, conversations }, setConversationsState] =
    useRecoilState(conversationsState);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const onResetNotificationConversation = () => {
    setConversationsState((prev) => ({
      ...prev,
      notificationConversation: null,
    }));
  };

  useEffect(() => {
    const latestConversation = getLatestConversation(conversations, currentUser?.uid);
    if (!latestConversation || latestConversation.id === currentConversation?.id) {
      return;
    }
    setConversationsState((prev) => ({
      ...prev,
      notificationConversation: latestConversation,
    }));
    setNotificationOpen(true);
    const timeout = setTimeout(() => {
      setNotificationOpen(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
      setNotificationOpen(false);
    };
  }, [conversations]);

  return (
    <AnimatePresence
      initial={false}
      mode="wait"
      onExitComplete={onResetNotificationConversation}
    >
      {notificationOpen && (
        <Container variants={VARIANTS} initial="hidden" animate="visible" exit="exit">
          <h3 className="visually-hidden">Notification</h3>
          <NotificationContent />
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Notification;
