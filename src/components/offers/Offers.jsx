import React from "react";
import "./offers.css";
import { BsPatchCheckFill } from "react-icons/bs";

const Offers = () => {
  return (
    <section id="experience">
      <h5>What We Offer</h5>
      <h2>Our Community</h2>

      <div className="container experience__container">
        <div className="experience__frontend">
          <h3>Workouts</h3>
          <div className="experience__content">
            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon" />
              <div>
                <h4>Something</h4>
                <small className="text-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  accusantium quas laboriosam, voluptates doloremque ipsa.
                </small>
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon" />
              <div>
                <h4>Something</h4>
                <small className="text-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  accusantium quas laboriosam, voluptates doloremque ipsa.
                </small>
              </div>
            </article>

          </div>
        </div>

        <div className="experience__backend">
          <h3>Nutrition</h3>
          <div className="experience__content">
            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon" />
              <div>
                <h4>Something</h4>
                <small className="text-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  accusantium quas laboriosam, voluptates doloremque ipsa.
                </small>
              </div>
            </article>

            <article className="experience__details">
              <BsPatchCheckFill className="experience__details-icon" />
              <div>
                <h4>Something</h4>
                <small className="text-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  accusantium quas laboriosam, voluptates doloremque ipsa.
                </small>
              </div>
            </article>



          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
