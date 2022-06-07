import React, { Component } from "react";
import { Container, Row, Col, ListGroup, FormControl } from "react-bootstrap";
import Card from "../../components/Card";
import axios from "axios";

export default class index extends Component {
  state = { games: [], categories: [], filteredGame: [] };

  componentDidMount() {
    axios
      .get("http://localhost:3001/games")
      .then((res) => {
        this.setState({ games: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://localhost:3001/categories")
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleSearchChange = (e) => {
    const v = e.target.value;
    const finalData = this.state.games.filter((g) =>
      g.name.toLocaleLowerCase().includes(v.toLocaleLowerCase())
    );

    this.setState({ filteredGame: finalData });
  };

  handleCategoryFiltration = (e) => {
    const finalData = this.state.games.filter((g) =>
      g.categoryIds.includes(e.id)
    );

    this.setState({ filteredGame: finalData });
  };

  render() {
    const { games, filteredGame, categories } = this.state;
    return (
      <Container fluid className="px-5 pt-3">
        <Row>
          <Col md={9}>
            <Row className="d-flex">
              <Col>
                <h4>Games</h4>
              </Col>
              <Col>
                <FormControl
                  type="text"
                  onChange={this.handleSearchChange}
                  placeholder="Search"
                />
              </Col>
            </Row>
            <hr />
            {filteredGame.length > 0
              ? filteredGame.map((g, i) => (
                  <Card
                    key={i}
                    code={g.code}
                    description={g.description}
                    img={g.icon}
                    title={g.name}
                  />
                ))
              : games.map((g, i) => (
                  <Card
                    key={i}
                    code={g.code}
                    description={g.description}
                    img={g.icon}
                    title={g.name}
                  />
                ))}
          </Col>
          <Col md={{ span: 2, offset: 1 }}>
            <h4>Categories</h4>
            <hr />
            <ListGroup>
              {categories.map((c, i) => (
                <ListGroup.Item
                  key={i}
                  onClick={() => this.handleCategoryFiltration(c)}
                >
                  {c.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
