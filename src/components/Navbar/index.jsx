import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

import "./style.css";

export default class index extends Component {
  state = { user: null };

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      const u = JSON.parse(user);
      this.setState({ user: u });
    }
  }

  onLogout = () => {
    const { user } = this.state;

    axios
      .post(`http://localhost:3001/logout`, { username: user.username })
      .then((res) => {
        localStorage.setItem("user", null);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { user } = this.state;

    return (
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="profile-nav">
              <img src={!!user ? `http://localhost:3000/${user.avatar}` : ""} />
              <div className="profile-details">
                <p>{!!user && user.name}</p>
                <p>{!!user && user.event}</p>
              </div>
            </div>
            <Nav className="me-auto">
              <Button variant="primary" onClick={this.onLogout}>
                Log out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
