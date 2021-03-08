import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Slider from '../components/Slider'

export const SliderPageTemplate = ({
  slider,
}) => {
  return (
    <section className="section">
      <Slider slider={slider} />
    </section>
  )
}

SliderPageTemplate.propTypes = {
  slider: PropTypes.array,
}

const SliderPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <div className="slider">
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
        }
      }
    }
  }
`
