import React from "react";
import logo from "../../assets/synergy-logo.png";
import { Link } from "react-router-dom";

export const Search = () => {
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });
  return (
    <>
      <div className="search">
        <div className="container c_flex">
          <div className="logo">
           <Link to="/"><img src={logo} alt="" /></Link> 
          </div>

          <div className="icon f_flex width">
            <div className="login">
              <Link to="/registration">
                <i className="fa fa-user icon-circle"></i>
              </Link>
            </div>

            <div className="cart">
              <Link to='/checkout'>
              <i className="fa fa-shopping-bag icon-circle"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
