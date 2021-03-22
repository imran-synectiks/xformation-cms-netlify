import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const SelectScenario = ({ selectScenario }) => {
  return (
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