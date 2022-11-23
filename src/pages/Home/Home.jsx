import React, { useState, useEffect } from "react";

import "./style.css";
import loginIcon from "../../img/login-icon.png";
import { getCountriesInfo } from "../../utils/utils";

import Avatar from "../../components/Avatar/Avatar";
import nullAvatar from "../../img/avatars/none.png"
import CountryOption from "../../components/CountryOption.jsx/CountryOption";
import { useChatContext } from "../../context/ChatContextProvider";

const Home = () => {
 
  const { isLoggedIn } = useChatContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countriesInfo, setCountriesInfo] = useState("");
  const [userInfo, setUserInfo] = useState([
    {
      username: "",
      country: "",
      age: "",
      gender: "",
      avatar: nullAvatar,
    },
  ]);
  const { username, country, age, gender, avatar } = userInfo[0];
  const handleChange = (e) => {
    const updatedArray = [...userInfo];
    updatedArray[0][e.target.name] = e.target.value;

    setUserInfo(updatedArray);
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
  useEffect(() => {
    getCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username)
    console.log(country)
    console.log(age)
    console.log(gender)
    console.log(avatar)
  };
  return (
    <>
      <section>
        <div className="home__container -flex">
          <div className="home__logo"></div>
          <h2 className="home__title -title">
            Online Chat rooms Without Registration
          </h2>
          <h3 className="home__subtitle">JD Chat Rooms</h3>
          <div className="home__register">
            <h4 className="register__title">Join Chat</h4>
            <form onSubmit={e=> handleSubmit(e)}>
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
                <Avatar userInfo={userInfo} setUserInfo={setUserInfo}/>
              </div>
              {/* CAPTCHA */}
              <button className="register__submit -btn-primary" type="submit">
                <img
                  className="register__login__icon"
                  src={loginIcon}
                  alt="login"
                />
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
