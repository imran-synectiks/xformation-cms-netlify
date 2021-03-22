import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import { Scrollbars } from 'react-custom-scrollbars';

const SelectScenario = ({ scenarios }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);

  function onClickSubSelectScenario(scenario) {
    setSelectedScenario(scenario);
  }


  return (
    <div className="scenario-container">
      <Scrollbars
        className="scenarioleft-scrollbars"
      >
        <ul>
          {scenarios.map((scenario) => (
            <li key={v4()}>
              <div className={`item ${selectedScenario === scenario ? 'active' : ''}`} onClick={() => onClickSubSelectScenario(scenario)}>
                <div className="image">
                  <img
                    src={scenario.image.childImageSharp.fluid.src}
                    alt={scenario.name}
                    title={scenario.name}
                    width="60"
                    height="60"
                  />
                </div>
                <div className="name">{scenario.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </Scrollbars>
      {selectedScenario &&
        <div className="sub-scenario-container">
          <Scrollbars>
            <ul>
              {selectedScenario.subItems.map((item) =>
                <li key={v4()} className="item">
                  <div className="image">
                    <img
                      src={item.image.childImageSharp.fluid.src}
                      alt={item.name}
                      title={item.name}
                      width="60"
                      height="60"
                    />
                  </div>
                  <div className="name">{item.name}</div>
                </li>
              )}
            </ul>
          </Scrollbars>
        </div>
      }
    </div>
  );
};

SelectScenario.propTypes = {
  scenarios: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      name: PropTypes.string,
      subItems: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
          name: PropTypes.string,
        })
      )
    })
  ),

}

export default SelectScenario