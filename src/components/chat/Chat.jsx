import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
const socket = io.connect("https://jhonndevelopershop.herokuapp.com");

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const token = JSON.parse(localStorage.getItem("user"));
  const inputRef = useRef(null);
  const msgListref = useRef(null);
  //   const navigate = useNavigate();

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
    var message = { username: "SampleUser1", message: inputRef.current.value };
    try {
      var res = await axios.post(
        "https://jhonndevelopershop.herokuapp.com/messages",
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
    getInfo();
  }, []);

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
          <button type="submit" className="messages_btn">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
