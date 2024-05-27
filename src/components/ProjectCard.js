import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./ProjectCard.css";

function ProjectCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card style={{ width: "18rem" }} onClick={handleShow}>
        <Card.Img
          variant="top"
          src="https://i.postimg.cc/FFZKVs1p/Creation-process-cuate.png"
        />
        <Card.Body>
          <Card.Title className="text-center">Card Title</Card.Title>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="modal-box d-flex">
            <Col lg={6}>
              <img
                src="https://i.postimg.cc/FFZKVs1p/Creation-process-cuate.png"
                alt=""
                className="modal-box-img"
              />
            </Col>
            <Col lg={6} className="d-flex flex-column justify-content-center">
              <h5>Project description</h5>
              <p>Spectrum Project using html and css</p>
              <h5>Technologies :</h5>
              <p>HTML, CSS</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex" onClick={handleClose}>
            <i className="fa-solid fa-link fa-2x me-2"></i> <p>Live Link</p>
          </div>
          <div className="d-flex" onClick={handleClose}>
            <i className="fa-brands fa-github fa-2x me-2"></i>{" "}
            <p>GitHub Repo</p>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectCard;
