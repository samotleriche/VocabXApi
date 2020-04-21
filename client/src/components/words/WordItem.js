import React from "react";
import PropTypes from 'prop-types';

const WordItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className='card text-center'>
      <h3>{title}</h3>
      <img src={avatar_url} alt='' className='round-img' style={{ width: '60px' }} />
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
