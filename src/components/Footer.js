import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer py-5">
      <Container fluid>
        <Row>
          <Col lg={3} md={6}>
            <h6>Project Master</h6>
            <p>Completely Free App To Manage All Software Projects</p>
            <p>For any Query contact@projectfair.com</p>
          </Col>
          <Col lg={3} md={6}>
            <h6>Link</h6>
            <ul className="footer-text">
              <li>Home</li>
              <li>Login</li>
              <li>Sign Up</li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h6>Guides</h6>
            <ul className="footer-text">
              <li>React</li>
              <li>React Bootstrap</li>
              <li>Routing</li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h6>Contact Us</h6>
            <div className="contact-sec d-flex gap-3">
              <input type="text" className="form-control " />
              <button className="btn border text-white">Send</button>
            </div>
            <h6 className="mt-2">Get In Touch</h6>
            <div className="d-flex gap-3">
              <i class="fa-brands fa-github"></i>
              <i class="fa-brands fa-linkedin"></i>
              <i class="fa-brands fa-twitter"></i>
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-instagram"></i>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
