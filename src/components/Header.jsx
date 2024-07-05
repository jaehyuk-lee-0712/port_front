import React from "react";
import { ReactComponent as HeaderGraphic } from "../assets/img/header_grapihc.svg";
import { ReactComponent as NaviUp } from "../assets/img/nav__up.svg";
import { RiTriangleLine } from "react-icons/ri";
import { BsTriangle } from "react-icons/bs";
const Header = () => {
  return (
    <>
      <header className="page__header cursor-none">
        <div className="left__header cursor-none">
          <div className="header__nav">
            <div className="nav__inner">
              <div className="navigator__tab">
                <div className="navi__graphic cursor-none">
                  <HeaderGraphic></HeaderGraphic>
                </div>
                <div className="navi__label cursor-none">
                  <span className="label__sm">Welcome</span>
                </div>
                <button className="navi__toggle cursor-none">
                  <div className="btn__icon__up">
                    <BsTriangle
                      values={{ color: "white" }}
                      className="up__icon"
                    />
                  </div>
                  <div className="btn__icon__down"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="center__header cursor-none"></div>
        <div className="rigth__header cursor-none">
          <nav className="quicklinks">
            <div className="quic__items cursor-none">
              <a href="/" className="btn__wrap">
                <span className="btn__text">contact</span>
              </a>
            </div>
          </nav>
          <button className="hambugger__icon">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
