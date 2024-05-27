import React from "react";
import "./Auth.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Auth({ register }) {
  return (
    <div className="py-4 auth">
      <Container>
        <Link to={"/"}>
          <div className="back-button">
            <h5>
              <i class="fa-solid fa-angles-left me-2"></i>Back to Home
            </h5>
          </div>
        </Link>

        <Row className="m-5">
          <Col lg={6} className="auth-left">
            {register ? (
              <img
                src="https://i.postimg.cc/DynDKMxk/Sign-up-amico.png"
                alt=""
              />
            ) : (
              <img
                src="https://i.postimg.cc/9Xb0dzg6/Tablet-login-amico.png"
                alt=""
              />
            )}
          </Col>
          <Col lg={6} className="auth-right p-4">
            {register ? <h2>Sign - Up</h2> : <h2>Sign - In</h2>}
            {register && (
              <input
                type="text"
                className="form-control"
                placeholder="User-name"
              />
            )}
            <input
              type="email"
              className="form-control"
              placeholder="Email - Id
              "
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <button className="button-register">Register</button>
            {register ? (
              <label className="mt-3 text-white">
                Already Registeres ?{" "}
                <Link to={"/authentication"}>Login-In Here</Link>
              </label>
            ) : (
              <label className="mt-3 text-white">
                New User ? <Link to={"/register"}>Register Here</Link>
              </label>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Auth;
