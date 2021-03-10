import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Carousel from 'nuka-carousel';
import { AiOutlineLeft, AiOutlineRight, AiOutlineFullscreen } from "react-icons/ai";
import { css, cx } from '@emotion/css'

const Slider = ({ slider }) => (
  <Carousel
    renderCenterLeftControls={({ previousSlide }) => (
      <button onClick={previousSlide}
        className={css`
        padding: 0px 15px;
        background: transparent;
        color: rgba(255, 255, 255, .8);
        font-size: 45px;
        border: none;
        &:hover {
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }
        &:focus {
          border: none;
        }
      `}>
        <AiOutlineLeft />
      </button>
    )}
    renderCenterRightControls={({ nextSlide }) => (
      <button onClick={nextSlide}
        className={css`
        padding: 0px 15px;
        color: rgba(255, 255, 255, .8);
        background: transparent;
        font-size: 45px;
        border: none;
        &:hover {
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }
      `}>
        <AiOutlineRight />
      </button>
    )}
    dots={'false'}
  >
    {slider.map((sliderContent) => (
      <article key={v4()} className="slider-content">
        <div className="image">
          <a className="fullscreen" href="#">
            <AiOutlineFullscreen />
          </a>
          <span>
            <img src={sliderContent.image.childImageSharp.fluid.src} alt="" />
          </span>
        </div>
        <div className="content">
          <h3 className="has-text-weight-semibold is-size-2">
            {sliderContent.name}
          </h3>
          <p>
            {sliderContent.text}
          </p>
        </div>
      </article>
    ))}
  </Carousel>
)

Slider.propTypes = {
  slider: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      name: PropTypes.string,
      text: PropTypes.string,
    })
  ),
}

export default Slider