import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Words from "./components/words/Words";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get("http://api.github.com/users");

    this.setState({ users: res.data, loading: false });
    console.log(res);
  }

  render() {
    const numbers = [3, 4, 5];
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Words loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
