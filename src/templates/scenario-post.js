import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ScenarioSlider from '../components/Scenario/ScenarioSlider'
import SelectScenario from '../components/Scenario/SelectScenario'
import { AiFillCloseCircle } from "react-icons/ai";
import './scenario.css'

export const ScenarioPageTemplate = ({
  scenarios,
  slider,
}) => {
  const [showSelectScenario, setShowSelectScenario] = useState(false);
  const [showUseCase, setShowUseCase] = useState(false);
  const [useCase, setUseCase] = useState(null);

  function onClickSelectScenario() {
    setShowSelectScenario(true);
  };

  function onClickSelectScenarioClose() {
    setShowSelectScenario(false);
  };

  function onClickUseCase(uc) {
    if (uc.useCaseSlider) {
      setUseCase(uc);
      setShowUseCase(true);
    }
  }
  function onClickUseCaseClose() {
    setShowUseCase(false);
  }

  return (
    <>
      <div className={`scenario-select-container ${showSelectScenario === true ? 'active' : ''} ${showUseCase === true ? 'active-usecase' : ''}`}>
        <button className="button is-link scenario-btn" onClick={onClickSelectScenario}>Select Scenario</button>
        <SelectScenario
          scenarios={scenarios}
          onClickUseCase={onClickUseCase}
          onClickCloseScenario={onClickSelectScenarioClose}
        />
      </div>
      <div className={`scenario-slider-container ${showSelectScenario === true ? 'select-scenario' : ''} ${showUseCase === true ? 'select-usecase' : ''}`}>
        <ScenarioSlider
          slider={slider}
          showMoreDetailsButton={true}
        />
      </div>
      {showUseCase &&
        <div className={`scenario-slider-container ${showUseCase === true ? 'select-usecase' : ''}`}>
          <button className="close-btn" onClick={() => { onClickUseCaseClose(useCase) }}>
            <AiFillCloseCircle />
          </button>
          <ScenarioSlider
            slider={useCase.useCaseSlider}
            showMoreDetailsButton={false}
            onClickUseCaseClose={onClickUseCaseClose}
          />
        </div>
      }
    </>
  )
}

ScenarioPageTemplate.propTypes = {
  scenarios: PropTypes.array,
  slider: PropTypes.array,
}

const ScenarioPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  debugger;
  return (
    <ScenarioPageTemplate
      scenarios={frontmatter.scenarios}
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
        scenarios {
          image {
            childImageSharp {
              fluid(maxWidth: 60, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          subItems {
            image {
              childImageSharp {
                fluid(maxWidth: 60, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            name
            useCaseSlider {
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              name
              text
            }
          }
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
