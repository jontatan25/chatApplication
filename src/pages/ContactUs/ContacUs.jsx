import React, { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./style.css";

import SendIcon from "../../img/send-chat-icon.png";

const ContacUs = () => {

  const [info, setInfo] = useState([
    {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  ]);

  const handleChange = (e) => {
    const updatedInfo = [...info];
    updatedInfo[0][e.target.id] = e.target.value;
    setInfo(updatedInfo);
  };

  return (
    <>
      <div className="home__container -contact__container -flex">
        <PageHeader />
        <div className="home__register -contact -flex">
          <h4 className="register__title -contact__title">Contact Us</h4>
          <form
            className="contact__form"
            action="https://public.herotofu.com/v1/1e2b7250-7003-11ed-a377-655c67143cec"
            method="post"
            target="_blank"
          >
            <div className="contact__inp__container -flex">
              <label htmlFor="name" className="contact__lab">
                Name: *
              </label>
              <input
                id="name"
                name="name"
                className="contact__inp"
                type="text"
                value={info[0].name}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="contact__inp__container -flex">
              <label htmlFor="email" className="contact__lab">
                Email: *
              </label>
              <input
                id="email"
                name="email"
                className="contact__inp"
                type="email"
                value={info[0].email}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="contact__inp__container -flex">
              <label htmlFor="subject" className="contact__lab">
                Subject: *
              </label>
              <input
                id="subject"
                name="subject"
                className="contact__inp"
                type="text"
                value={info[0].subject}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="contact__inp__container -flex">
              <label htmlFor="message" className="contact__lab">
                Message: *
              </label>
              <textarea
                id="message"
                name="message"
                className="contact__inp"
                type="text"
                minLength="4"
                maxLength="200"
                
                value={info[0].message}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button
              className="messages_btn contact__btn -btn-primary -flex -acenter"
              type="submit"
            >
              <img
                className="send__message"
                src={SendIcon}
                alt="send message"
              />
              {/* <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div> */}
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContacUs;
