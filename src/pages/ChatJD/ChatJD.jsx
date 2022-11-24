import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Chat from "../../components/Chat/Chat";
import "./style.css";

import usersImg from "../../img/people-icon.png";
import { useChatContext } from "../../context/ChatContextProvider";
import { getCountriesInfo } from "../../utils/utils";

const ChatJD = () => {
  const { isLoggedIn, setIsLoggedIn } = useChatContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countriesInfo, setCountriesInfo] = useState("");
  const [userFlag, setUserFlag] = useState("");
  const navigate = useNavigate();

  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));

  useEffect(() => {
    if (!isLoggedIn && !localUserInfo) {
      navigate("/");
    } else if (!isLoggedIn && localUserInfo) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const getCountries = async () => {
    try {
      const res = await getCountriesInfo();
      setCountriesInfo(res);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const findUserFlag = (countriesInfo) => {
      const getUserCountry = countriesInfo.filter(country => country.name === localUserInfo.country)
      const flag = getUserCountry[0].flag
      setUserFlag(flag)
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if(countriesInfo && localUserInfo) {
      findUserFlag(countriesInfo);
    }
  }, [countriesInfo, localUserInfo]);

  return (
    <>
      {loading ? (
        <h3>...Loading</h3>
      ) : error ? (
        <h3>Oops Something went wrong. please Try again</h3>
      ) : (
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
                      localUserInfo.gender === "female"
                        ? "userInfo__gender -male"
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
                  style={{ backgroundImage: `url(${userFlag})` }}
                >
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatJD;
