import React, { createContext, useContext, useState } from "react";
const ChatContext = createContext([]);

// avoiding to import Usecontext everywhere
export const useChatContext = () => useContext(ChatContext);

const ChatContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [logout,setLogout] = useState(false);
  return (
    <ChatContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        logout,
        setLogout
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
