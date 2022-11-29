import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./style.css";

const AboutUs = () => {
  return (
    <>
      <div className="home__container -flex">
        <PageHeader />
        <div className="home__register">
          <h4 className="about__title">About ChatJD</h4>
          <p className="about__text">
            About Chattusa CHATTUSA is a free online chat room for people all
            over the world.{" "}
            <p className="about__text">
              It helps you meet new people, single women and men and make new
              friends.
            </p>{" "}
            <p className="about__text">
              We don't log or keep users' data and messages, making Chattusa
              totally Anonymous and secure.{" "}
            </p>
            <p className="about__text">
              {" "}
              If you want to protect your username and reserve it for personal
              use only, then you can sign up with your email and keep your
              nickname safe If you encounter any types of issues, please contact
              us.
            </p>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
