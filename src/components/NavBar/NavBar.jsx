import React from "react";
import "./style.css";
import {Link} from "react-router-dom"

const NavBar = () => {
  return (
    <header>
      <div className="navBar__container -flex">
        <Link to = "/">
        <div className="navBar__logo" alt="Company Logo"></div>
        </Link>
        <ul className="navBar__nav -flex">
          <li className="nav__item">
            <Link to = "/">
            <button className="nav__item-btn -btn-primary -title">Home</button>{" "}
            </Link>
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
