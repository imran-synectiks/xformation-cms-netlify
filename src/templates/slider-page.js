import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Slider from '../components/Slider'
import './slider.css'

export const SliderPageTemplate = ({
  slider,
}) => {
  return (
    <Slider slider={slider} />
  )
}

SliderPageTemplate.propTypes = {
  slider: PropTypes.array,
}

const SliderPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <div className="slider-container">
      <SliderPageTemplate
        slider={frontmatter.slider}
      />
    </div>
  )
}

SliderPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default SliderPage

export const sliderPageQuery = graphql`
  query SliderPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        slider {
          image {
            childImageSharp {
              fluid(maxWidth: 240, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          text
        }
      }
    }
  }
`
