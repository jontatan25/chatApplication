import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logoutIcon from "../../img/logout-icon.png";
import { useChatContext } from "../../context/ChatContextProvider";

const NavBar = () => {
  const [showBurguer, setShowBurguer] = useState(false);
  const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
  const { setLogout } = useChatContext();
  const handleLogOut = () => {
    setLogout(true);
  };
  return (
    <header>
      <div className="navBar__container -flex">
        <Link to="/">
          <div className="navBar__logo" alt="Company Logo"></div>
        </Link>
        {!localUserInfo ? (
          <>
            <button
              className="nav__burguer -primary-btn"
              onClick={() => setShowBurguer(!showBurguer)}
            >
              <span
                className={
                  !showBurguer
                    ? "burguer__menu -top"
                    : "burguer__menu -top -activebtn"
                }
              ></span>
              <span
                className={
                  !showBurguer
                    ? "burguer__menu -middle"
                    : "burguer__menu -middle -activebtn"
                }
              ></span>
              <span
                className={
                  !showBurguer
                    ? "burguer__menu -bottom"
                    : "burguer__menu -bottom -activebtn"
                }
              ></span>
            </button>
            <ul
              className={
                !showBurguer
                  ? "navBar__nav -flex"
                  : "navBar__nav -flex -nav-active"
              }
            >
              <li className="nav__item">
                <Link to="/">
                  <button className="nav__item-btn -btn-primary -title">
                    Home
                  </button>{" "}
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/about">
                  <button className="nav__item-btn -btn-primary -title">
                    About us
                  </button>{" "}
                </Link>
              </li>

              <li className="nav__item">
                <Link to="/contact">
                  <button className="nav__item-btn -btn-primary -title">
                    Contact
                  </button>
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <button
            className="nav__btn-out -flex -acenter"
            onClick={handleLogOut}
          >
            Log Out <img src={logoutIcon} alt="logout Button" />
          </button>
        )}
      </div>
    </header>
  );
};

export default NavBar;
