import { createContext, SetStateAction, useState } from "react";

export interface Context {
  sidebarOpen: boolean;
  setSidebarOpen: (open: SetStateAction<boolean>) => void;
  deleteWindowOpen: boolean;
  setDeleteWindowOpen: (open: SetStateAction<boolean>) => void;
  setUserDataOpen: boolean;
  setSetUserDataOpen: (open: SetStateAction<boolean>) => void;
  username: string;
  setUsername: (username: SetStateAction<string>) => void;
  usersVisible: boolean;
  setUsersVisible: (visible: SetStateAction<boolean>) => void;
  usersLoading: boolean;
  setUsersLoading: (loading: SetStateAction<boolean>) => void;
}

export const AppContext = createContext<Context | null>(null);

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deleteWindowOpen, setDeleteWindowOpen] = useState(false);
  const [setUserDataOpen, setSetUserDataOpen] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [usersLoading, setUsersLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        deleteWindowOpen,
        setDeleteWindowOpen,
        setUserDataOpen,
        setSetUserDataOpen,
        username,
        setUsername,
        usersVisible,
        setUsersVisible,
        usersLoading,
        setUsersLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
