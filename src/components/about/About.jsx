import React from "react";
import "./about.css";
import photo1 from "../../assets/photo1.jpg";

import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {



  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Synergy Fitness</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={photo1} alt="" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">

            <article className="about__card">
              <FaAward className='about__icon'/>
              <h5>Qualified Trainers</h5>
              <small>10+ highly qualified trainers.</small>
            </article>

            <article className="about__card">
              <FiUsers className='about__icon'/>
              <h5>Happy Clients</h5>
              <small>500+ happy clients.</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className='about__icon'/>
              <h5>Training Programs</h5>
              <small>Home workout experience. </small>
            </article>

          </div>

          <h1>Power, perseverance, and discipline.</h1>
          <p>
            Step by step video workouts for home and gym to get fitter and
            stronger. Delicious, nutritionist-crafted meal plans based on your preferences. Build strength
            and tone with Synergy Fitness, no matter what your goal is.
          </p>

          <a href="#contact" className="btn btn-primary" >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
