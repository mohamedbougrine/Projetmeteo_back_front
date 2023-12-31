import React, { useState } from 'react';
import { Row, Col, FormControl, Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from React Router

const CitySelector = ({ onSelectButtonClick }) => {
  const [city, setCity] = useState(null);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">weather</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button variant="outline-primary" as={Link} to="/login">Login</Button>
            <Button variant="outline-success" as={Link} to="/signup">Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row>
        <Col>
          <h1>Ajouter votre ville</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <FormControl
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => onSelectButtonClick(city)}>Check weather</Button>
        </Col>
      </Row>
    </>
  );
};

export default CitySelector;
