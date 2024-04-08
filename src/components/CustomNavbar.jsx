import React, { useContext, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { UserContext } from "../customHooks/UserContext";
import { auth } from "../firebase";
import pinterestLogo from "../assets/logos/pinterest.png";
import "./CustomNavbar.css";

const CustomNavbar = memo(() => {
  const { user, isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
  const location = useLocation();

  const logout = () => {
    auth.signOut();
    setIsUserLoggedIn(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="xxl" className="navbar-custom bg-pinterest">
      <Container>
        <Nav>
          <Link as={Link} to="/" className="me-2">
            <img src={pinterestLogo} alt="Pinterest logo" width="50" height="50" />
          </Link>
          <Link
            as={Link}
            to="/"
            className={`rounded-5 p-3 fw-bold me-2 text-dark text-decoration-none ${
              isActive("/") ? "customaActive" : ""
            }`}
          >
            Home
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 form-control-custom"
              aria-label="Search"
            />
          </Form>
          <Nav>
            {isUserLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                  <img
                    src={user?.photoURL || "path/to/default-photo.jpg"}
                    alt="Profile"
                    width="50"
                    height="50"
                    className={`rounded-circle ${isActive("/profile") ? "profileActive" : ""}`}
                  />
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className={`nav-link-custom ${isActive("/login") ? "active" : ""}`}
                  onClick={logout}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className={`nav-link-custom ${isActive("/login") ? "active" : ""}`}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default CustomNavbar;