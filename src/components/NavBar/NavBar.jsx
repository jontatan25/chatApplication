import React from "react";
import "./style.css" 

const NavBar = () => {
  return (
    <div className="navBar__container -flex">
      <div className="navBar__logo" alt="Company Logo"></div>
      <ul className="navBar__nav -flex">
        <li className="nav__item"><button className="nav__item-btn -btn-primary">Home</button> </li>
        <li className="nav__item"><button className="nav__item-btn -btn-primary">About</button> </li>
        <li className="nav__item"><button className="nav__item-btn -btn-primary">Contact Us</button></li>
      </ul>
    </div>
  );
};

export default NavBar;
