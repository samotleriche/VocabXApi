import React, { Component } from "react";

class WordItem extends Component {
  render() {
    const { title, definition, POS } = this.props.word;
    return (
      <div className='card text-center'>
        <h3>{title}</h3>

        <div>
          {definition}, <strong>{POS}</strong>
        </div>
      </div>
    );
  }
}

export default WordItem;
