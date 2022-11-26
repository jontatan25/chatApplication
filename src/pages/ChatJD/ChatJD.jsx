import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/ChatContextProvider";

import Chat from "../../components/Chat/Chat";
import "./style.css";

import usersImg from "../../img/people-icon.png";

const ChatJD = () => {
  const { isLoggedIn, setIsLoggedIn } = useChatContext();
  const [users, setUsers] = useState([]);

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
    <>
      {users && (
        <div className="chat__container -flex">
          <div className="chat__window">
            <div className="chat__window__title -title -flex">Chat</div>
            <Chat user={localUserInfo} setUsers={setUsers} />
          </div>

          <div className="chat__users">
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
                <li
                  key={user._id}
                  className="chat__userInfo -flex"
                >
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
      )}
    </>
  );
};

export default ChatJD;
