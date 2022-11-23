import React, { useEffect, useState } from "react";

import "./style.css";

import avatarBackgrounds from "./ImgModule";
import nullAvatar from "../../img/avatars/none.png"
import sortDown from "../../img/sort-down.png";

const Avatar = ({ userInfo}) => {
  const [loading, setLoading] = useState(true);
  const [showAvatar, setShowAvatar] = useState(false);
  const [maleAvatars, setMaleAvatars] = useState([]);
  const [femaleAvatars, setFemaleAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState([nullAvatar]);
  const selectedGender = userInfo[0].gender

  const toogleAvatar = (e) => {
    e.preventDefault();
    setShowAvatar(!showAvatar);
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
    if (!loading) {
      if (selectedGender === "ismale") setSelectedAvatar(maleAvatars[0]);
      else if (selectedGender === "isfemale")
        setSelectedAvatar(femaleAvatars[0]);
    }
  }, [loading, selectedGender]);

  const handleAvatarChange = (e, img) => {
    e.preventDefault();
    setSelectedAvatar(img);
  };


  return (
    <div className="avatar__register__container">
      {!loading ? (
        <button
          className="avatar__dropdown -flex -acenter"
          onClick={(e) => toogleAvatar(e)}
          disabled={!selectedGender ? true : false}
        >
          <div className="avatar__container -flex">
            <div
              className="avatar__image"
              style={
                !selectedGender
                  ? { backgroundImage: `url(${nullAvatar})` }
                  : { backgroundImage: `url(${selectedAvatar.url})` }
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
                      onClick={(e) => handleAvatarChange(e, image)}
                      key={image.url}
                      className="avatar__image"
                      style={{ backgroundImage: `url(${image.url})` }}
                    ></div>
                  );
                })
              : femaleAvatars.map((image) => {
                  return (
                    <div
                      onClick={(e) => handleAvatarChange(e, image)}
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
    </div>
  );
};

export default Avatar;
