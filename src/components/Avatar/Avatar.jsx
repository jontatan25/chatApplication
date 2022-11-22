import React, { useEffect, useState } from "react";
import "./style.css";

import avatarBackgrounds from "./ImgModule";

import sortDown from "../../img/sort-down.png";

const Avatar = ({ selectedGender }) => {
  const [loading, setLoading] = useState(true);
  const [showAvatar, setShowAvatar] = useState(false);
  const [maleAvatars, setMaleAvatars] = useState([]);
  const [femaleAvatars, setFemaleAvatars] = useState([]);

  const toogleAvatar = (e) => {
    e.preventDefault();
    setShowAvatar(!showAvatar);
    console.log("print");
  };

  useEffect(() => {
    const maleArray = [];
    const femaleArray = [];
    for (let i = 0; i < avatarBackgrounds.length; i++) {
      const element = avatarBackgrounds[i];
      if (i < 15) maleArray.push(element);
      else femaleArray.push(element);
    }
    setMaleAvatars(maleArray);
    setFemaleAvatars(femaleArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(showAvatar);
  }, [maleAvatars]);
  return (
    <>
      {!loading ? (
        <button
          className="avatar__dropdown -flex -acenter"
          onClick={(e) => toogleAvatar(e)}
        >
          <div className="avatar__container -flex">
            <div
              className="avatar__image"
              style={
                selectedGender === "ismale"
                  ? { backgroundImage: `url(${maleAvatars[0].url})` }
                  : { backgroundImage: `url(${femaleAvatars[0].url})` }
              }
            ></div>
          </div>
          <img
            style={{ width: "12px", height: "12px" }}
            src={sortDown}
            alt="Dropdown arrow"
          />
          <div className="avatar__options -flex" aria-expanded={showAvatar}>
            {selectedGender === "ismale"
              ? maleAvatars.map((image) => {
                  return (
                    <div
                      key={image.url}
                      className="avatar__image"
                      style={{ backgroundImage: `url(${image.url})` }}
                    ></div>
                  );
                })
              : femaleAvatars.map((image) => {
                  return (
                    <div
                      key={image.url}
                      className="avatar__image"
                      style={{ backgroundImage: `url(${image.url})` }}
                    ></div>
                  );
                })}
          </div>
        </button>
      ) : (
        <h3>Loading ...</h3>
      )}
    </>
  );
};

export default Avatar;
