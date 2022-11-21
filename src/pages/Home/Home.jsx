import React from "react";
import "./style.css";

const Home = () => {
  return (
    <>
      <section>
        <div className="home__container -flex">
          <div className="home__logo"></div>
          <h2 className="home__title">
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
                <select className="register__input" name="country" id="countryOption"></select>
              </div>
              <div className="register__group -flex">
                <label className="register__label -flex" htmlFor="age">
                  Age
                </label>
                <input className="register__input" id="age" type="number" min="1" max="99" />
              </div>
              <div className="register__group -flex">
                <span className="register__label -flex">Gender</span>
                <div  className="register__input">
                  <input id="male"name="gender" value="male" type="radio" />
                  <label htmlFor="male">Male</label>
                  <input id="female" name="gender" value="female" type="radio" />
                  <label htmlFor="male">Female</label>
                </div>
              </div>
              <div className="register__group -flex">
                <span className="register__label -flex">Avatar</span>
                {/* SELECT AVATAR */}
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
