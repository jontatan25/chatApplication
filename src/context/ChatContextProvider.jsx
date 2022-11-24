import React, { createContext, useContext, useState } from "react";
const ChatContext = createContext([]);

// avoiding to import Usecontext everywhere
export const useChatContext = () => useContext(ChatContext);

const ChatContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  return (
    <ChatContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
