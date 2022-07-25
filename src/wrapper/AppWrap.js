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

          <div className="copyright">
            <p className="p-text">@2022 Prakhar</p>
            <p className="p-text">All rights reserved.</p>
            <p className="p-text">Just joking, copy away.</p>
            <p className="p-text">I copy lotta stuff too.</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
