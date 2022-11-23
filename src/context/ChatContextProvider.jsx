import React, { createContext, useContext, useState } from "react";
const ChatContext = createContext([]);

// avoiding to import Usecontext everywhere
export const useChatContext = () => useContext(ChatContext);

const ChatContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  return (
    <ChatContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedin,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
