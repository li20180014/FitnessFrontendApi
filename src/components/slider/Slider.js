import React, { useRef } from "react"
import useSlider from "./hooks/useSlider"
import './slider.css'

const Slider = ({ images }) => {
  const slideImage = useRef(null)
  const slideText = useRef(null)
  const slideTitle = useRef(null)
  const { goToPreviousSlide, goToNextSlide } = useSlider(
    slideImage,
    slideText,
    slideTitle,
    images
  )

  return (
    <div className="slider" ref={slideImage}>
      <div className="slider--content">
        <button onClick={goToPreviousSlide} className="slider__btn-left">
          <i className="fas fa-angle-left"></i>
        </button>

        <div className="slider--feature">
          <h1 ref={slideTitle} className="feature--title"></h1>
          <p ref={slideText} className="feature--text"></p>
          <button className="feature__btn">Sign Up</button>
        </div>

        <button onClick={goToNextSlide} className="slider__btn-right">
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Slider