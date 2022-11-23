import React from "react";
import Chat from "../../components/Chat/Chat";
import "./style.css";

import usersImg from "../../img/people-icon.png";
const ChatJD = () => {
  return (
    <div className="chat__container -flex">
      <div className="chat__window">
        <div className="chat__window__title -title -flex">Chat</div>
        <Chat />
      </div>
      <div className="chat__users">
        <div className="chat__window__title -users-title -title -flex">
          <img
            className="chat__users__img"
            src={usersImg}
            alt="group of people chatting"
          />{" "}
          Users Online &#10088;#&#10089;
        </div>
      </div>
    </div>
  );
};

export default ChatJD;
