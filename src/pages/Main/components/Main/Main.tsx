import { AnimatePresence } from "framer-motion";
import useAppContext from "../../../../hooks/useAppContext";
import AppLayout from "../../../../layouts/AppLayout/AppLayout";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import Notification from "../../../../modules/Notification";
import DeleteConversation from "../../../../modules/DeleteConversation";

const Main: React.FC = () => {
  const { deleteWindowOpen } = useAppContext();

  return (
    <AppLayout>
      <h1 className="visually-hidden">Messenger</h1>
      <Sidebar />
      <Chat />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => {}}>
        {deleteWindowOpen && <DeleteConversation />}
      </AnimatePresence>
      <Notification />
    </AppLayout>
  );
};

export default Main;
