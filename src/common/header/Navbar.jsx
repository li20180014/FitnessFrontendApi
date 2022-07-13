import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";

export const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [MobileMenu, setMobileMenu] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = authService.getCurrentToken();
    if (token) {
      const role = token.authorities[0].authority;
      setUserRole(role);
      setShowProfile(true);
      setShowLogout(true);
      setShowSchedule(true);
    }
  }, []);

  const logOut = () => {
    authService.logout();
    setShowProfile(false);
    setShowLogout(false);
  };


  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="categories d_flex"></div>

          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              {showSchedule && (<li>
                <Link to="/schedules">Schedules</Link>
              </li>)}
              
              {showProfile && (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              )}
              
              <li>
                <Link to="/exercises">Exercises</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              {
                userRole == "ROLE_ADMIN" && 
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              }
              {showLogout && (
                <li>
                  <a href="/login" onClick={logOut}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fa-solid fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
