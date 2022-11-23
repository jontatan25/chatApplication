import React from "react";
import "./style.css";

const NavBar = () => {
  return (
    <header>
      <div className="navBar__container -flex">
        <div className="navBar__logo" alt="Company Logo"></div>
        <ul className="navBar__nav -flex">
          <li className="nav__item">
            <button className="nav__item-btn -btn-primary -title">Home</button>{" "}
          </li>
          <li className="nav__item">
            <button className="nav__item-btn -btn-primary -title">About</button>{" "}
          </li>
          <li className="nav__item">
            <button className="nav__item-btn -btn-primary -title">
              Contact Us
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
