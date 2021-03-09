import React from 'react'
import PropTypes from 'prop-types'
import { ServicePostTemplate } from '../../templates/service-post'

const ServicePostPreview = ({ entry, widgetFor, getAsset }) => {
  const tags = entry.getIn(['data', 'tags'])
  const entryPage = entry.getIn(['data', 'page'])
  const page = entryPage ? entryPage.toJS() : []
  const entryTestimonials = entry.getIn(['data', 'testimonials'])
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : []
  return (
    <ServicePostTemplate
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      testimonials={testimonials}
      page={page}
    />
  )
}

ServicePostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
}

export default ServicePostPreview
