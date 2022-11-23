import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./style.css";
import sendChatImg from "../../img/send-chat-icon.png";

const socket = io.connect("https://jhonndevelopershop.herokuapp.com");

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const token = JSON.parse(localStorage.getItem("user"));
  const inputRef = useRef(null);
  const msgListref = useRef(null);

  const getInfo = async () => {
    try {
      const res = await axios.get(
        "https://jhonndevelopershop.herokuapp.com/messages",
        {}
      );
      setMessages(res.data.messages);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  let handleSumbitMessage = async (e) => {
    e.preventDefault();
    var message = { username: "SampleUseR", message: inputRef.current.value };
    try {
      var res = await axios.post(
        "https://jhonndevshop.vercel.app/api/messages",
        message,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if ((res.data.success = true)) {
        socket.emit("user_message", message);
        inputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if(!isLoggedIn) navigate("/");
  // });
  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const eventListener = (newMessage) => {
      console.log(newMessage);
      if (messages) {
        setMessages((messages) => [...messages, newMessage]);
      } else setMessages([newMessage]);
    };
    socket.on("new_message", eventListener);
    return () => socket.off("new_message", eventListener);
  }, [messages]);

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
      <div className="messagesContainer">
        <ul ref={msgListref} id="messages">
          {messages ? (
            messages.map((messageInfo) => {
              return (
                <li key={messageInfo.id} className="messages__user">
                  {messageInfo.username}:
                  <span key={messageInfo.id} className="messages__user-message">
                    {messageInfo.message}
                  </span>
                </li>
              );
            })
          ) : (
            <li className="messages__user">No messages</li>
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
    </>
  );
};

export default Chat;
