import React, { useContext, useEffect, useState } from "react";
import "./DashBoard.css";
import { Col, Container, Row } from "react-bootstrap";
import Profile from "../components/Profile";
import Header from "../components/Header";
import Projects from "../components/Projects";
import { profileUpdateContext } from "../services/ContextShare";

function DashBoard() {
  const [userName, setUserName] = useState("");
  const { editProfile } = useContext(profileUpdateContext);
  useEffect(() => {
    let name = localStorage.getItem("currentUser");
    if (name) {
      setUserName(name);
    }
  }, [editProfile]);

  return (
    <div>
      <Header dashboard />
      <Container fluid className="my-5">
        <Row>
          <Col lg={8}>
            <h2>Welcome {userName}</h2>
            <Projects />
          </Col>
          <Col lg={4}>
            <Profile />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashBoard;
