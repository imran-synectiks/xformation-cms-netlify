import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ScenarioSlider from '../components/ScenarioSlider'
import SelectScenario from '../components/SelectScenario'
import { AiFillCloseCircle } from "react-icons/ai";
import './scenario.css'

export const ScenarioPageTemplate = ({
  selectScenario,
  slider,
}) => {
  const [showSelectScenario, setShowSelectScenario] = useState(false);
  const [hideSelectScenario, setHideSelectScenario] = useState(true);

  function onClickSelectScenario() {
    setShowSelectScenario(true);
    setHideSelectScenario(false);
  };

  function onClickSelectScenarioclose() {
    setShowSelectScenario(false);
    setHideSelectScenario(true);
  };

  return (
    <>
      <div className={`scenario-select-container ${showSelectScenario === true ? 'active' : ''}`}>
        {hideSelectScenario &&
          <button className="button is-link scenario-btn" onClick={onClickSelectScenario}>Select Scenario</button>
        }
        {showSelectScenario &&
          <div className="select-scenario-left">
            <button className="close-btn" onClick={onClickSelectScenarioclose}>
              <AiFillCloseCircle />
            </button>
            <SelectScenario
              selectScenario={selectScenario}
            />
          </div>
        }
      </div>
      <div className={`scenario-slider-container ${showSelectScenario === true ? 'select-scenario' : ''}`}>
        <ScenarioSlider
          slider={slider}
        />
      </div>
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
    <ScenarioPageTemplate
      selectScenario={frontmatter.selectScenario}
      slider={frontmatter.slider}
    />
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
