import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Words from "./components/words/Words";
import "./App.css";

class App extends React.Component {
  foob = () => "arrrgh";

  render() {
    const numbers = [3, 4, 5];
    return (
      <div className='App'>
        <Navbar />
        <Words />
      </div>
    );
  }
}

export default App;
