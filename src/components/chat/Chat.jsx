import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./style.css";
import sendChatImg from "../../img/send-chat-icon.png";

// const socket = io.connect("http://localhost:8080");
const URL = "https://chatserver-s4bm.onrender.com"
const socket = io.connect(URL);

const Chat = ({ user, setUsers }) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messagesError, setMessagesError] = useState("");

  const inputRef = useRef(null);
  const msgListref = useRef(null);

  const getInfo = async () => {
    try {
      const res = await axios.get("https://chatserver-s4bm.onrender.com/api/messages", {});
      setMessages(res.data.messages);
      setLoadingMessages(false);
      return;
    } catch (error) {
      setMessagesError(error);
      console.log(error);
    }
  };

  let handleSumbitMessage = async (e) => {
    e.preventDefault();

    var message = {
      username: user.username,
      message: inputRef.current.value,
      avatar: user.avatar,
    };
    try {
      var res = await axios.post(
        "https://chatserver-s4bm.onrender.com/api/messages",
        message
      );
      if ((res.data.success = true)) {
        socket.emit("user_message", res.data.body);
        inputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const eventListener = (newMessage) => {
      if (messages) {
        setMessages((messages) => [...messages, newMessage]);
      } else setMessages([newMessage]);
    };
    socket.on("new_message", eventListener);
    return () => {
      socket.off("new_message", eventListener);
    };
  }, [messages]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    if (user) {
      socket.emit("addUser", user);
    }
    socket.on("newUserConnected", (users) => {
      setUsers(users);
    });
    socket.on("newuserDisconnected", () => {});

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newUserConnected");
      socket.off("addUser");
    };
  }, [isConnected]);
  useEffect(() => {
    if (msgListref && msgListref.current) {
      const element = msgListref.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [msgListref, messages]);

  return (
    <>
      {loadingMessages ? (
        <h4>Loading Messages.. </h4>
      ) : messagesError ? (
        <h4>Something went Wrong, Please try again Later</h4>
      ) : (
        messages && (
          <div className="messagesContainer -flex">
            <ul ref={msgListref} id="messages">
              {messages ? (
                messages.map((messageInfo) => {
                  return (
                    <li key={messageInfo.id} className="messages__user">
                      <div
                        className="messages__avatar"
                        style={{
                          backgroundImage: `url(${messageInfo.avatar})`,
                        }}
                      ></div>
                      {messageInfo.username}:
                      <span className="messages__user-message">
                        {messageInfo.message}
                      </span>
                      <span className="messages__time">{messageInfo.date}</span>
                    </li>
                  );
                })
              ) : (
                <li className="messages__user">
                  There is No messages. Be the First one to say Hi!
                </li>
              )}
            </ul>
            <form id="form" onSubmit={handleSumbitMessage}>
              <input
                id="input"
                type="text"
                ref={inputRef}
                autoComplete="off"
                name="message"
              />
              <button
                type="submit"
                className="messages_btn -title -btn-primary -flex -acenter"
              >
                <img
                  className="send__message"
                  src={sendChatImg}
                  alt="send message"
                />
                SEND
              </button>
            </form>
          </div>
        )
      )}
    </>
  );
};

export default Chat;
