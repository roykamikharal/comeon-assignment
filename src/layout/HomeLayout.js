import React, { Component } from "react";
import Navbar from "../components/Navbar";
export default class HomeLayout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
