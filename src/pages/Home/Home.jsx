import React, { useState } from "react";
import "./style.css";

import Avatar from "../../components/Avatar/Avatar";
const Home = () => {
  const [gender, setGender] = useState("ismale");

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
            <form>
              <div className="register__group -flex">
                <label className="register__label -flex" htmlFor="user">
                  Username
                </label>
                <input className="register__input" id="user" type="text" />
              </div>
              <div className="register__group -flex">
                <label className="register__label -flex" htmlFor="country">
                  Country
                </label>
                <select
                  className="register__input"
                  name="country"
                  id="countryOption"
                ></select>
              </div>
              <div className="register__group -flex">
                <label className="register__label -flex" htmlFor="age">
                  Age
                </label>
                <input
                  className="register__input"
                  id="age"
                  type="number"
                  min="1"
                  max="99"
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
                    checked={gender === "ismale"?"checked" : ""}
                    onChange={(e) => setGender(e.target.value)}
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
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label
                    className="register__input__gender -title"
                    htmlFor="female"
                  >
                    Female
                  </label>
                </div>
              </div>
              <div className="register__group register__avatar -flex">
                <span className="register__label -flex">Avatar</span>
                <Avatar selectedGender={gender}/>
              </div>
              {/* CAPTCHA */}
              <button className="-btn-primary" type="submit">
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
