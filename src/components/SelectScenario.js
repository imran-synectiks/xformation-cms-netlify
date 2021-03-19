import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import { AiFillCloseCircle } from "react-icons/ai";

const SelectScenario = ({ selectScenario }) => {
  const [showSelectScenario, setSelectScenario] = useState(false);

  function onClickSelectScenario() {
    setSelectScenario(true);
  };

  function onClickSelectScenarioclose() {
    setSelectScenario(false);
  };

  return (
    <div className="select-scenario">
      <button className="button is-link scenario-btn" onClick={onClickSelectScenario}>Select Scenario</button>
      {showSelectScenario &&
        <div className="select-scenario-left">
          <button className="close-btn" onClick={onClickSelectScenarioclose}>
            <AiFillCloseCircle />
          </button>
          <ul>
            {selectScenario.map((selectContent) => (
              <li key={v4()}>
                <div className="image">
                  <img
                    src={selectContent.image.childImageSharp.fluid.src}
                    alt={selectContent.name}
                    title={selectContent.name}
                    width="80"
                    height="80"
                  />
                </div>
                <div className="name">{selectContent.name}</div>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

SelectScenario.propTypes = {
  selectScenario: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      name: PropTypes.string,
      text: PropTypes.string,
    })
  ),

}

export default SelectScenario