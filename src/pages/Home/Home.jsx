import React, { useState, useEffect } from "react";

import "./style.css";
import loginIcon from "../../img/login-icon.png";
import { getCountriesInfo } from "../../utils/utils";

import Avatar from "../../components/Avatar/Avatar";
import nullAvatar from "../../img/avatars/none.png";
import CountryOption from "../../components/CountryOption.jsx/CountryOption";
import { useChatContext } from "../../context/ChatContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";

const Home = () => {
  const { setIsLoggedIn, setUser } = useChatContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countriesInfo, setCountriesInfo] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [userInfo, setUserInfo] = useState([
    {
      username: "",
      country: "",
      flag: "",
      age: "",
      gender: "",
      avatar: nullAvatar,
    },
  ]);
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    if (localUserInfo) {
      navigate("/chat");
    }
  }, [localUserInfo]);

  const handleChange = (e) => {
    const updatedArray = [...userInfo];
    updatedArray[0][e.target.name] = e.target.value;
    setUserInfo(updatedArray);
    if (e.target.name === "country") {
      const getUserCountry = countriesInfo.filter(
        (country) => country.name === e.target.value
      );
      const userFlag = getUserCountry[0].flag;
      const updatedArray = [...userInfo];
      updatedArray[0].flag = userFlag;
      setUserInfo(updatedArray);
    }
  };

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

  const saveUser = async (postedInfo) => {
    setLoadingLogin(true);
    try {
      const res = await axios.post(
        // "http://192.168.0.104:8080/api/messages/register",
        "https://chatserver-s4bm.onrender.com/api/messages/register",
        postedInfo
      );
      if (res.data.success === true) {
        setIsLoggedIn(true);
        setUser(res.data.body);
        console.log(res.data.body);
        localStorage.setItem("localUserInfo", JSON.stringify(res.data.body));
        navigate("/chat");
        setLoadingLogin(false);
      } else {
        console.log("something Went wrong", res.data);
        setLoadingLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(userInfo[0]);
  };
  return (
    <>
      <section>
        <div className="home__container -flex">
         <PageHeader/>
          <div className="home__register">
            <h4 className="register__title">Join Chat</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
              <fieldset disabled={loadingLogin}>
                <div className="register__group -flex">
                  <label className="register__label -flex" htmlFor="user">
                    Username
                  </label>
                  <input
                    className="register__input"
                    id="user"
                    name="username"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="register__group -flex">
                  <label className="register__label -flex" htmlFor="country">
                    Country
                  </label>
                  <select
                    className="register__input register__option"
                    name="country"
                    id="countryOption"
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option className="register__option" value="">
                      -Please choose your Country
                    </option>
                    {loading ? (
                      <option>Loading . . .</option>
                    ) : error ? (
                      <option>Something went wrong</option>
                    ) : (
                      countriesInfo &&
                      countriesInfo.map((country) => (
                        <CountryOption
                          key={country.iso3}
                          countryName={country.name}
                        />
                      ))
                    )}
                  </select>
                </div>
                <div className="register__group -flex">
                  <label className="register__label -flex" htmlFor="age">
                    Age
                  </label>
                  <div className="register__input age__container">
                    <input
                      className="register__input"
                      id="age"
                      name="age"
                      type="number"
                      min="1"
                      max="99"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>
                <div className="register__group -flex">
                  <span className="register__label -flex">Gender</span>
                  <div className="register__input -noborder -flex -acenter">
                    <input
                      id="male"
                      name="gender"
                      value="ismale"
                      type="radio"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label
                      className="register__input__gender -title"
                      htmlFor="male"
                    >
                      Male
                    </label>
                    <input
                      id="female"
                      name="gender"
                      value="isfemale"
                      type="radio"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label
                      className="register__input__gender -title"
                      htmlFor="female"
                    >
                      Female
                    </label>
                  </div>
                </div>
                <div className="register__group register__avatar -flex -acenter">
                  <span className="register__label -flex">
                    Choose your Avatar
                  </span>
                  <Avatar userInfo={userInfo} setUserInfo={setUserInfo} />
                </div>
                {/* CAPTCHA */}
                <button className="register__submit -btn-primary -flex -acenter" type="submit">
                 
                  {!loadingLogin ? (
                    <>
                     <img
                     className="register__login__icon"
                     src={loginIcon}
                     alt="login"
                   />
                    LOGIN
                    </>
                  ) : (
                    <div className="lds-ellipsis -homeLoader">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
