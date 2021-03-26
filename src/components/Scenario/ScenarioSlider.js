import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import { AiOutlineLeft, AiOutlineRight, AiOutlineFullscreen, AiFillCloseCircle } from "react-icons/ai";
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { CustomGallery, Item, DefaultLayout } from 'react-photoswipe-gallery'
import { Scrollbars } from 'react-custom-scrollbars';

const ScenarioSlider = ({ slider, showMoreDetailsButton }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const layoutRef = useRef()

  function gotoNextSlide() {
    if ((currentSlide + 1) < slider.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  function goToPreviousSlide() {
    if (currentSlide - 1 >= 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  function onClickMoreDetails() {
    setShowMoreDetails(true);
  };

  function onClickMoreDetailsclose() {
    setShowMoreDetails(false);
  };

  return (
    <>
      <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
        {slider.map((sliderContent, index) => (
          <article key={v4()} className={`slider-content ${currentSlide === index ? 'active' : ''}`}>
            <Scrollbars>
              <div className="item-image">
                <Item
                  original={sliderContent.image && sliderContent.image.childImageSharp ? sliderContent.image.childImageSharp.fluid.src : sliderContent.image}
                  thumbnail={sliderContent.image && sliderContent.image.childImageSharp ? sliderContent.image.childImageSharp.fluid.src : sliderContent.image}
                  width="1920"
                  height="1280"
                >
                  {({ ref, open }) => (
                    <div ref={ref} onClick={open}>
                      <button className="fullscreen">
                        <AiOutlineFullscreen />
                      </button>
                      <img
                        src={sliderContent.image && sliderContent.image.childImageSharp ? sliderContent.image.childImageSharp.fluid.src : sliderContent.image}
                        alt={sliderContent.name}
                        title={sliderContent.name}
                      />
                    </div>
                  )}
                </Item>
              </div>
              <div className="item-content">
                <div className="columns is-multiline">
                  <div className="column is-10">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {sliderContent.name}
                    </h3>
                  </div>
                  {
                    showMoreDetailsButton &&
                    <div className="column is-2">
                      <button className="button is-link float-right more-details-btn" onClick={onClickMoreDetails}>More details</button>
                      {showMoreDetails &&
                        <div
                          className="more-details-content"
                          style={{
                            backgroundImage: `url(${sliderContent.image && sliderContent.image.childImageSharp ? sliderContent.image.childImageSharp.fluid.src : sliderContent.image})`,
                          }}
                        >
                          <Scrollbars>
                            <div className="details-content-inner">
                              <button className="close-btn" onClick={onClickMoreDetailsclose}>
                                <AiFillCloseCircle />
                              </button>
                              <div className="container">
                                <div className="columns is-multiline">
                                  <div className="column is-8">
                                    <h3 className="has-text-weight-semibold is-size-2">
                                      {sliderContent.moreDetails.moreDetailsName}
                                    </h3>
                                    <p>
                                      {sliderContent.moreDetails.moreDetailsText}
                                    </p>
                                  </div>
                                  <div className="column is-4">
                                    {
                                      sliderContent.moreDetails.moreDetailsImage.map((image, index) =>
                                        <div key={v4()} className="image">
                                          <img
                                            src={image.image && image.image.childImageSharp ? image.image.childImageSharp.fluid.src : image.image}
                                            alt={sliderContent.moreDetails.moreDetailsName}
                                            title={sliderContent.moreDetails.moreDetailsName}
                                            width="300"
                                            height="200"
                                          />
                                        </div>
                                      )
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Scrollbars>
                        </div>
                      }
                    </div>
                  }
                </div>
                <div className="columns is-multiline">
                  <div className="column is-12">
                    <p>
                      {sliderContent.text}
                    </p>
                  </div>
                </div>
              </div>
            </Scrollbars>
          </article>
        ))}
        <ul className="pager">
          {slider.map((sliderContent, index) => (
            <li key={v4()} onClick={() => setCurrentSlide(index)} className={`pager-item ${currentSlide === index ? 'active' : ''}`}>
            </li>
          ))}
        </ul>
        <button className='nabtn-left' onClick={goToPreviousSlide}>
          <AiOutlineLeft />
        </button>
        <button className='nabtn-right' onClick={gotoNextSlide}>
          <AiOutlineRight />
        </button>
      </CustomGallery>
      <DefaultLayout
        shareButton={false}
        fullscreenButton={true}
        zoomButton={true}
        ref={layoutRef}
      />
    </>
  );
};

ScenarioSlider.propTypes = {
  slider: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      name: PropTypes.string,
      text: PropTypes.string,
      moreDetails: PropTypes.arrayOf(
        PropTypes.shape({
          moreDetailsName: PropTypes.string,
          moreDetailsText: PropTypes.string,
          moreDetailsImage: PropTypes.arrayOf(
            PropTypes.shape({
              image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
            })
          ),
        })
      ),
    })
  ),
}

export default ScenarioSlider