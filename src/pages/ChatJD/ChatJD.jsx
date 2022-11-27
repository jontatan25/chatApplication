import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/ChatContextProvider";

import Chat from "../../components/Chat/Chat";
import "./style.css";

import usersImg from "../../img/people-icon.png";
import logo from "../../img/logo-CJD.png";

const ChatJD = () => {
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(true);
  const navigate = useNavigate();
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  const handleToogle = (value) => {
    setActiveChat(value)
  }
  useEffect(() => {
    if (!localUserInfo) {
      navigate("/");
    }
  }, [localUserInfo]);

  return (
    <>
      {users && (
        <>
          <div className="chat__mobile__options">
            <button onClick={()=>handleToogle(true)} className={activeChat ? "-btn-primary mobile__options -chat -flex -acenter -active" : "-btn-primary mobile__options -chat -flex -acenter"}>
            <img
                className="chat__users__img"
                src={logo}
                alt="group of people chatting"
              />
              Chat
            </button>
            <button onClick={()=>handleToogle(false)} className={activeChat ? "-btn-primary mobile__options -users -flex -acenter" : "-btn-primary mobile__options -users -flex -acenter -active"}>
              <img
                className="chat__users__img"
                src={usersImg}
                alt="group of people chatting"
              />
              Users
            </button>
          </div>
          <div className="chat__container -flex">
            <div className={activeChat ? "chat__window" : "chat__window -hideWindow" }>
              <div className="chat__window__title -title -flex">Chat</div>
              <Chat user={localUserInfo} setUsers={setUsers} />
            </div>
            <div className={activeChat ?"chat__users -hideWindow": "chat__users"}>
              <div className="chat__window__title -users-title -title -flex">
                <img
                  className="chat__users__img"
                  src={usersImg}
                  alt="group of people chatting"
                />
                Users Online &#10088;{users.length}&#10089;
              </div>
              <ul className="chat__users__active">
                {users.map((user) => (
                  <li key={user._id} className="chat__userInfo -flex">
                    <div className="chat__userInfo__details -flex -acenter">
                      <div
                        className={
                          user.gender === "isfemale"
                            ? "userInfo__gender -female"
                            : "userInfo__gender -male"
                        }
                      ></div>
                      <div
                        className="userInfo__avatar"
                        style={{
                          backgroundImage: `url(${user.avatar})`,
                        }}
                      ></div>
                      {user.username}
                    </div>
                    <div
                      className="chat__userInfo__flag"
                      style={{ backgroundImage: `url(${user.flag})` }}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatJD;
