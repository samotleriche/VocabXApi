import React from "react";
import PropTypes from 'prop-types';

const WordItem = ({ word: { title, definition, POS } }) => {
  return (
    <div className='card text-center'>
      <h3>{title}</h3>

      <div>
        {definition}, <strong>{POS}</strong>
      </div>
    </div>
  );
};

WordItem.propTypes = {
  word: PropTypes.object.isRequired,
}

export default WordItem;
