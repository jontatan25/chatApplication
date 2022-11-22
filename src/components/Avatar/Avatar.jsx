import React, { useEffect, useState } from "react";
import "./style.css";

import avatarBackgrounds from "./ImgModule";

import sortDown from "../../img/sort-down.png";

const Avatar = ({ selectedGender }) => {
  const [loading, setLoading] = useState(true);
  const [showAvatar, setShowAvatar] = useState(false);
  const [maleAvatars, setMaleAvatars] = useState([]);
console.log(avatarBackgrounds)
  const toogleAvatar = () => {
    setShowAvatar(!showAvatar);
  };

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < 15; i++) {
      const element = avatarBackgrounds[i];
      newArray.push(element);
    }
    setMaleAvatars(newArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(maleAvatars)
  },[maleAvatars])
  return (
    <>
    {!loading ?   <div className="avatar__dropdown -flex -acenter" onClick={toogleAvatar}>
        <div className="avatar__container -flex">
          <div
            className="avatar__image"
            style={{ backgroundImage: `url(${avatarBackgrounds[0].url})` }}
          ></div>
        </div>
        <img
          style={{ width: "12px", height: "12px" }}
          src={sortDown}
          alt="Dropdown arrow"
        />
        <div className="avatar__options -flex">
          {selectedGender === "ismale"
            ? maleAvatars.map((image) => {
                return <div
                  className="avatar__image"
                  style={{ backgroundImage: `url(${image.url})` }}
                ></div>;
              })
            : ""}
        </div>
      </div>: <h3>Loading ...</h3> }
    
    </>
  );
};

export default Avatar;
