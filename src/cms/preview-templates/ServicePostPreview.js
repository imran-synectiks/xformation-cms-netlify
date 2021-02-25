import React from 'react'
import PropTypes from 'prop-types'
import { ServicePostTemplate } from '../../templates/service-post'

const ServicePostPreview = ({ entry, widgetFor,getAsset }) => {
  const tags = entry.getIn(['data', 'tags'])
  const page1 = entry.getIn(['data', 'page1', 'page1'])
  const entryTestimonials = entry.getIn(['data', 'testimonials'])
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : []
  return (
    <ServicePostTemplate
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      testimonials={testimonials}
      page1={{
        heading: entry.getIn(['data', 'page1', 'heading']),
        description: entry.getIn(['data', 'page1', 'description']),
        image1: {
          image: getAsset(entry.getIn(['data', 'page1', 'image1', 'image'])),
          alt: entry.getIn(['data', 'page1', 'image1', 'alt']),
        },
      }}
      page2={{
        heading: entry.getIn(['data', 'page2', 'heading']),
        description: entry.getIn(['data', 'page2', 'description']),        
      }}
      page3={{
        heading: entry.getIn(['data', 'page3', 'heading']),
        description: entry.getIn(['data', 'page3', 'description']),        
      }}
      page4={{
        heading: entry.getIn(['data', 'page4', 'heading']),
        description: entry.getIn(['data', 'page4', 'description']),
        }}
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
