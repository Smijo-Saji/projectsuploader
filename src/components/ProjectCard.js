import React from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./ProjectCard.css";
import { base_url } from "../services/baseUrl";

function ProjectCard({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card style={{ width: "18rem" }} onClick={handleShow}>
        <Card.Img
          style={{ height: "11rem" }}
          variant="top"
          src={`${base_url}/images/${data.coverImg}`}
        />
        <Card.Body>
          <Card.Title className="text-center">{data.title}</Card.Title>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="modal-box d-flex">
            <Col lg={6} className="d-flex align-items-center">
              <img
                style={{ height: "10rem" }}
                src={`${base_url}/images/${data.coverImg}`}
                alt=""
                className="modal-box-img"
              />
            </Col>
            <Col lg={6} className="d-flex flex-column justify-content-center">
              <h5>Project Description</h5>
              <p>{data.description}</p>
              <h5>Technologies :</h5>
              <p>{data.technologies}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="text-dark">
          <a href={data.website}>
            <div className="d-flex">
              <i className="fa-solid fa-link fa-2x me-2"></i>
              <p>Live Link</p>
            </div>
          </a>{" "}
          <a href={data.gitHub}>
            <div className="d-flex">
              <i className="fa-brands fa-github fa-2x me-2"></i>{" "}
              <p>GitHub Repo</p>
            </div>
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectCard;
