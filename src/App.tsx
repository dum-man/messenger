import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import ProtectedRoute from "./app/ProtectedRoute";
import AuthRoute from "./app/AuthRoute";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import { conversationsState } from "./app/atoms/conversationsState";
import { getConversations } from "./app/service/conversationsService";
import { auth } from "./app/firebase";
import { getMessages } from "./app/service/messagesService";
import { messagesState } from "./app/atoms/messagesState";

const App = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const [currentUser] = useAuthState(auth);

  const setConversationsState = useSetRecoilState(conversationsState);
  const setMessagesStateValue = useSetRecoilState(messagesState);
  const { currentConversation } = useRecoilValue(conversationsState);

  const getUserConversations = (userId: string) => {
    try {
      getConversations(userId, setConversationsState);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserMessages = (conversationId: string) => {
    try {
      getMessages(conversationId, setMessagesStateValue);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUserConversations(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentConversation?.id) {
      getUserMessages(currentConversation.id);
    }
  }, [currentConversation?.id]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute>
            <Signup />
          </AuthRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="*"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default App;
