import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function CustomNavbar({ isUserLoggedIn, userPhotoURL }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isUserLoggedIn);
  }, [isUserLoggedIn]);

  return (
    <Navbar expand="xxl" className="bg-body-tertiary navbar-custom">
      <Container>
        <Navbar.Brand href="#home" className="brand-custom">
          Pinterestn't Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 form-control-custom"
              aria-label="Search"
            />
          </Form>
          <Nav>
            {isLogged ? (
              <Nav.Link href="#profile" className="nav-link-custom">
                <img
                  src={userPhotoURL || "path/to/default-photo.jpg"}
                  alt="Profile"
                  width="50"
                  height="50"
                  className="rounded-circle"
                />
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login" className="nav-link-custom">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
