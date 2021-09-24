import React from 'react'
import PropTypes from 'prop-types'
import { PageRenderTemplate } from '../../templates/renderer-page'

const PageRenderPreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data', 'pagerendererjson']);
  return (
    <PageRenderTemplate
      pagerendererjson={data && data.toJS()}
    />
  )
}

PageRenderPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default PageRenderPreview
