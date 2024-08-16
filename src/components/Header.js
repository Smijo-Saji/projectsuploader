import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthContext } from "../services/AuthContext";

function Header({ dashboard }) {
  const { setIsAuth } = useContext(tokenAuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate("/");
  };
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to={"/"}>
            {" "}
            <Navbar.Brand>Project-Master</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {dashboard && (
              <Nav className="ms-auto">
                <div
                  className="text-dark pointer"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout{" "}
                  <i class="fa-solid fa-arrow-right-from-bracket ms-2"></i>
                </div>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
