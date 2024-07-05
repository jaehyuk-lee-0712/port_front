import React from "react";
import { ReactComponent as HeaderGraphic } from "../assets/img/header_grapihc.svg";
import Header from "./Header";
import Home from "../pages/Home";

const Main = ({ children }) => {
  // return <main id="main">{children}</main>;
  return (
    <>
      <div className="container cursor-none">
        <Header />
        <Home />
      </div>
    </>
  );
};

export default Main;
