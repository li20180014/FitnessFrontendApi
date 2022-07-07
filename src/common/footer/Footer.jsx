import React from 'react'
import './footer.css'
import {FaFacebook} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import {BsLinkedin} from 'react-icons/bs'
import logo from "../../assets/synergy-logo.png";


const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer__logo'>
        <img src={logo}/>
      </a>

      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#bout">Schedules</a></li>
        <li><a href="#experience">Profile</a></li>
        <li><a href="#portfolio">Nutrition</a></li>
        <li><a href="#contact">Exercises</a></li>
        <li><a href="#contact">Blog</a></li>
      </ul>

      <div className="footer__socials">
      <a href="https://facebook.com"> <FaFacebook/></a>  
      <a href="https://instagram.com"> <FiInstagram/></a>  
      <a href="https://linkedin.com"> <BsLinkedin/></a>  
      </div>

      <div className="footer__copyright">
      <small>&copy; All rights reserved 2022.</small>

      </div>
    </footer>
  )
}

export default Footer
