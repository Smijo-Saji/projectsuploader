import React, { useEffect, useState } from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { getHomeProjects } from "../services/allApis";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [homeProjects, setHomeProjects] = useState([]);

  const getPorjects = async () => {
    const res = await getHomeProjects();
    setHomeProjects(res.data);
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLoggedIn(true);
    }
    getPorjects();
  }, []);

  console.log(homeProjects);
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
            {isLoggedIn ? (
              <Link to={"/dashboard"}>
                <button class="cta">
                  <span>Explore Profile...</span>

                  <svg width="15px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </Link>
            ) : (
              <Link to={"/authentication"}>
                <button class="cta">
                  <span>Start Here...</span>

                  <svg width="15px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </Link>
            )}
          </Col>
        </Row>
      </Container>

      <Container className="explore-sec my-4">
        <h2 className="text-center mb-5">Explore Porjects</h2>
        <div className="d-flex justify-content-evenly  flex-wrap gap-5">
          {homeProjects.length > 0 ? (
            homeProjects.map((i) => <ProjectCard data={i} />)
          ) : (
            <div>
              <img
                src="https://i.postimg.cc/XJjHtqdF/No-data-pana.png"
                alt=""
                style={{ width: "300px" }}
              />
              <p className="text-white text-center">
                No Projects Uploaded Yet !!
              </p>
            </div>
          )}
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
