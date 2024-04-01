import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { UserContext } from "../customHooks/UserContext";
import { auth } from "../firebase";
function CustomNavbar() {
  const user = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("CustomNavbar: User logged in:", user);
      setIsLogged(true);
    }
  }, [user]);

  const logout = () => {
    console.log("logout: cerrando sesion");
    auth.signOut();
    setIsLogged(false);
  };

  return (
    <Navbar expand="xxl" className="bg-body-tertiary navbar-custom">
      <Container>
        <Navbar.Brand href="/" className="brand-custom">
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
              <>
                <Nav.Link href="#profile" className="nav-link-custom">
                  <img
                    src={user?.photoURL || "path/to/default-photo.jpg"}
                    alt="Profile"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                </Nav.Link>
                <Nav.Link
                  href="/login"
                  className="nav-link-custom"
                  onClick={logout}
                >
                  logout
                </Nav.Link>
              </>
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
