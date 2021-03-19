import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ScenarioSlider from '../components/ScenarioSlider'
import SelectScenario from '../components/SelectScenario'
import './scenario-slider.css'

export const ScenarioPageTemplate = ({
  selectScenario,
  slider,
}) => {
  return (
    <>
      <SelectScenario
        selectScenario={selectScenario}
      />
      <ScenarioSlider
        slider={slider}
      />
    </>
  )
}

ScenarioPageTemplate.propTypes = {
  selectScenario: PropTypes.array,
  slider: PropTypes.array,
}

const ScenarioPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <div className="scenario-slider-container">
      <ScenarioPageTemplate
        selectScenario={frontmatter.selectScenario}
        slider={frontmatter.slider}
      />
    </div>
  )
}

ScenarioPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ScenarioPage

export const scenarioPageQuery = graphql`
  query ScenarioPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        selectScenario {
          image {
            childImageSharp {
              fluid(maxWidth: 80, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
        }
        slider {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          text
          moreDetails {
            moreDetailsName
            moreDetailsText
            moreDetailsImage {
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
