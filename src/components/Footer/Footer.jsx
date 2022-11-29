import React from "react";
import "./style.css";
import Logo from "../../img/logo-CJD.png";
const Footer = () => {
  return (
    <>
      <div className="footer__container -flex">
        <h2 className="footer__title">ChatJD Online Chat Rooms</h2>
        <p className="footer__text -flex -acenter">
          {" "}
          <img
            className="chat__users__img -footerImg"
            src={Logo}
            alt="group of people chatting"
          />
          2022 - The best free online international chat rooms. Chat online with
          anyone from all around the world and meet new people.
        </p>

        <h2 className="-alias">- ®JhonnDev</h2>
      </div>
    </>
  );
};

export default Footer;
