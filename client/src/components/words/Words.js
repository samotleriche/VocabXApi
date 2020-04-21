import React, { Component } from "react";
import WordItem from "./WordItem";

class Words extends Component {

  render() {
    return (
      <div style={userStyle}>
        {this.props.words.map(user => {

          <WordItem key={user.id} user={user}/>
        })}
        
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
