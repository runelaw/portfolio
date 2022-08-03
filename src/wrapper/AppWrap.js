import React from "react";
import { NavigationDots, SocialMedia } from "../components";

const AppWrap =
  ({ idName, classNames }) =>
  (WrappedComponent) =>
  (props) => {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />

        <div className="app__wrapper app__flex">
          <WrappedComponent {...props} />
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };


export default AppWrap;
