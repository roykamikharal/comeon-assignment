import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./style.css";

export default class index extends Component {
  render() {
    const { img, title, description, code } = this.props;
    return (
      <Card className="my-card">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" href={`/games/${code}`}>
            Play
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
