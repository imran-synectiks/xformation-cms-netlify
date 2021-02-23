import React from 'react'
import PropTypes from 'prop-types'
import { ServicePostTemplate } from '../../templates/service-post'

const ServicePostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  const page1 = entry.getIn(['data', 'page1', 'page1'])
  return (
    <ServicePostTemplate
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      page1={{
        heading: entry.getIn(['data', 'page1', 'heading']),
        description: entry.getIn(['data', 'page1', 'description']),
      }}
    />
  )
}

ServicePostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ServicePostPreview
