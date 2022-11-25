import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/ChatContextProvider";

import Chat from "../../components/Chat/Chat";
import "./style.css";

import axios from "axios";
import usersImg from "../../img/people-icon.png";

const ChatJD = () => {
  const { isLoggedIn, setIsLoggedIn } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.0.104:8080/api/messages/chatusers"
      );
      if (data.success === true) {
        setUsers(data.users);
        setLoading(false);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !localUserInfo) {
      navigate("/");
    } else if (!isLoggedIn && localUserInfo) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      {loading ? (
        <h3>Loading ...</h3>
      ) : error ? (
        <h3>Error</h3>
      ) : (
        users && (
          <div className="chat__container -flex">
            <div className="chat__window">
              <div className="chat__window__title -title -flex">Chat</div>
              <Chat user={localUserInfo} users={users} setUsers={setUsers} />
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
                {users.map((user) => 
                   <li  className="chat__userInfo -flex">
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
                )}
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
                      style={{
                        backgroundImage: `url(${localUserInfo.avatar})`,
                      }}
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
        )
      )}
    </>
  );
};

export default ChatJD;
