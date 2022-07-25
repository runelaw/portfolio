import React from "react";

import { images } from "../../constants";
import { AppWrap } from "../../wrapper";

import Typewriter from "typewriter-effect";

import "./header.scss";

const Header = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="app__flex app__header-container">
        <div className="app__header-text">
          <span className="app__tagline">Welcome to my Portfolio</span>
          <h1 className="head-text">
            <span>👋</span>
            Hello I'm <span>Prakhar</span>
          </h1>
          <span className="app__wrap">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Web Developer")
                  .pauseFor(500)
                  .deleteAll()
                  .typeString("Data Analyst")
                  .pauseFor(500)
                  .deleteAll()
                  .typeString("Philomath!")
                  .start();
              }}
            />
          </span>
          <p className="p-text">
            Have experience working with multiple technologies and tech stacks.
            Currently working on
            <span> inferential statistical models</span> and their applications.
          </p>
          <button
            type="button"
            className="p-text"
            onClick={() =>
              openInNewTab(
                "https://drive.google.com/file/d/198Yg_lao14MEK7tdU97n9pwox2hWZ2AA/view?usp=sharing"
              )
            }
          >
            Get Resume
          </button>
        </div>
        <div className="app__header-img">
          <img src={images.astroheader} alt="header" />
        </div>
      </div>
    </>
  );
};

export default AppWrap({ idName: "home" })(Header);
