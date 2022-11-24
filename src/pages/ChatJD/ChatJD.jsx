import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Chat from "../../components/Chat/Chat";
import "./style.css";

import usersImg from "../../img/people-icon.png";
import { useChatContext } from "../../context/ChatContextProvider";

const ChatJD = () => {
  const { isLoggedIn, setIsLoggedIn } = useChatContext();

  const navigate = useNavigate();

  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  useEffect(() => {
    if (!isLoggedIn && !localUserInfo) {
      navigate("/");
    } else if (!isLoggedIn && localUserInfo) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <div className="chat__container -flex">
      <div className="chat__window">
        <div className="chat__window__title -title -flex">Chat</div>
        <Chat user={localUserInfo} />
      </div>

      <div className="chat__users">
        <div className="chat__window__title -users-title -title -flex">
          <img
            className="chat__users__img"
            src={usersImg}
            alt="group of people chatting"
          />
          Users Online &#10088;#&#10089;
        </div>
        <ul className="chat__users__active">
          <li className="chat__userInfo -flex">
            <div className="chat__userInfo__details -flex -acenter">
              <div
                className={
                  localUserInfo.gender === "isfemale"
                    ? "userInfo__gender -female"
                    : "userInfo__gender -male"
                }
              ></div>
              <div
                className="userInfo__avatar"
                style={{ backgroundImage: `url(${localUserInfo.avatar})` }}
              ></div>
              {localUserInfo.username}
            </div>
            <div
              className="chat__userInfo__flag"
              style={{ backgroundImage: `url(${localUserInfo.flag})` }}
            ></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatJD;
