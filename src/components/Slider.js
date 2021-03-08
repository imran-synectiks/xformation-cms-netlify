import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Carousel from 'nuka-carousel';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { css, cx } from '@emotion/css'

const Slider = ({ slider }) => (
  <Carousel renderCenterLeftControls={({ previousSlide }) => (
    <button onClick={previousSlide}
      className={css`
    padding: 15px 30px;
    background: transparent;
    color: rgba(230, 126, 34, 1);
    font-size: 45px;
    border: none;
    &:hover {
      color: rgba(0, 0, 0, .8);
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
    padding: 15px 30px;
    color: rgba(230, 126, 34, 1);
    background: transparent;
    font-size: 45px;
    border: none;
    &:hover {
      color: rgba(0, 0, 0, .8);
      cursor: pointer;
    }
  `}>
        <AiOutlineRight />
      </button>
    )}
  >
    {slider.map((sliderimage) => (
      <article key={v4()} className="images">
        <img src={sliderimage.image.childImageSharp.fluid.src} alt="" />
      </article>
    ))}
  </Carousel>
)

Slider.propTypes = {
  slider: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ),
}

export default Slider