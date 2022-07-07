import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const [MobileMenu, setMobileMenu]= useState(false);
  return (
    <>
    <header className='header'>
       <div className="container d_flex">
        <div className="categories d_flex">
      
        </div>

        <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={()=> setMobileMenu(false)}>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
              <Link to='/schedules'>Schedules</Link>
              </li>
              <li>
              <Link to='/profile'>Profile</Link>
              </li>
              <li>
              <Link to='/nutrition'>Nutrition</Link>
              </li>
              <li>
              <Link to='/exercises'>Exercises</Link>
              </li>
              <li>
              <Link to='/blog'>Blog</Link>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fa-solid fa-bars open'></i>}
            </button>
          </div>
    </div>
    </header>
    </>
  )
}
