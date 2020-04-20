import React, { Component } from "react";
import WordItem from "./WordItem";

class Words extends Component {
  state = {
    words: [
      {
        title: "Ineffable",
        definition:
          "Too great or extreme to be expressed or described in words",
        POS: "adjective"
      },
      {
        title: "Exegesis",
        definition:
          "Critical explanation or interpretation of a text, usually a scripture.",
        POS: "adjective"
      },
      {
        title: "Inexorable",
        definition:
          "Impossible to stop or prevent; impossible to persuade by request.",
        POS: "adjective"
      }
    ]
  };

  render() {
    return (
      <div style={userStyle}>
        {this.props.words.map(word => (
          <WordItem key={word.title} word={word} />
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Words;
