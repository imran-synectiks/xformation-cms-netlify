import React from 'react'
import PropTypes from 'prop-types'
import { SliderPageTemplate } from '../../templates/slider-page'

const SliderPagePreview = ({ entry }) => {
  const entrySlider = entry.getIn(['data', 'slider'])
  const slider = entrySlider ? entrySlider.toJS() : []
  return (
    <SliderPageTemplate
      slider={slider}
    />
  )
}

SliderPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default SliderPagePreview
