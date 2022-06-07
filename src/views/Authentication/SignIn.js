import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

export default class SignIn extends Component {
  state = { email: "", password: "", error: "", isLoading: false };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const user = {
      username: email,
      password,
    };
    axios
      .post(`http://localhost:3001/login`, user)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.player, username: user.username })
        );
        this.setState({ error: "success", isLoading: false }, () => {
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        });
      })
      .catch((e) => {
        debugger;
        if (e.message === "Network Error") {
          this.setState({ error: e.message, isLoading: false });
        } else {
          this.setState({ error: e.response.data.error, isLoading: false });
        }
      });
  };

  render() {
    const { email, password, error, isLoading } = this.state;
    return (
      <div>
        <Container>
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Col md={4}>
              <Card className="p-5">
                <Form onSubmit={this.onSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      value={email}
                      name="email"
                      onChange={this.handleChange}
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      name="password"
                      onChange={this.handleChange}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <p
                    className={`text-capitalize 
                      ${error === "success" ? "text-success" : "text-danger"}
                    `}
                  >
                    {error}
                  </p>
                  <Button variant="primary" type="submit">
                    {isLoading ? "Loading…" : "Submit"}
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
