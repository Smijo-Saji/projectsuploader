import React from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home py-5">
      <Container fluid>
        <Row>
          <Col lg={6} className="hero-sec-left">
            <img src="https://i.postimg.cc/wMjWCFfx/91706219044.png" alt="" />
          </Col>
          <Col
            lg={6}
            className="hero-sec-right d-flex flex-column justify-content-center align-items-center"
          >
            <h4 className="mb-4">Project Master</h4>
            <h6 className="text-center w-75">
              One Stop Destination For All Software Development Projects. Where
              Uzer Can Add And Manage Their Projects. As Well As Accezz All
              Frojects Available in Our Website. What Are You Waiting For!
            </h6>
            <Link to={"/authentication"}>
              <button class="cta">
                <span>Explore Here...</span>

                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Link>
          </Col>
        </Row>
      </Container>

      <Container className="explore-sec my-4">
        <h2 className="text-center mb-5">Explore Porjects</h2>
        <div className="d-flex justify-content-evenly  flex-wrap">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
        <Link to={"/allprojects"}>
          <h4 className="mt-5 text-center explore-more-btn">
            Explore More Projects{" "}
            <i class="fa-solid fa-angle-left fa-rotate-180 "></i>
          </h4>
        </Link>
      </Container>
    </div>
  );
}

export default Home;
