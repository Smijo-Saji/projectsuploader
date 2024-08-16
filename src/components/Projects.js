import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addProjectApi } from "../services/allApis";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Project from "./Project";
import { addResponseContext } from "../services/ContextShare";

function Projects() {
  //accces context
  const { setAddUpdate } = useContext(addResponseContext);

  const [show, setShow] = useState(false);

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    technologies: "",
    website: "",
    gitHub: "",
    coverImg: "",
  });

  const [preview, setPreview] = useState("");

  const handleClose = () => {
    setInputData({
      title: "",
      description: "",
      technologies: "",
      website: "",
      gitHub: "",
      coverImg: "",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const setInputs = (e) => {
    let { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleaAddProject = async () => {
    const { title, description, technologies, website, gitHub, coverImg } =
      inputData;
    if (
      !title ||
      !description ||
      !technologies ||
      !website ||
      !gitHub ||
      !coverImg
    ) {
      toast.warning("Please Fill All Fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        //header - token,multipart/form-data
        const header = {
          "Content-Type": "multipart/form-data",
          access_token: `Bearer ${token}`,
        };
        //body- form data
        const body = new FormData();
        body.append("title", title);
        body.append("description", description);
        body.append("technologies", technologies);
        body.append("website", website);
        body.append("gitHub", gitHub);
        body.append("coverImg", coverImg);

        const result = await addProjectApi(body, header);

        console.log(result);
        if (result.status === 201) {
          // toast.success("Adding Success", {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          //   transition: Bounce,
          // });
          alert("success");
          setAddUpdate((prev) => !prev);
          handleClose();
        } else {
          toast.error("Adding Failed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    }
  };
  console.log(inputData);
  useEffect(() => {
    if (inputData.coverImg) {
      setPreview(URL.createObjectURL(inputData.coverImg));
    } else {
      setPreview("");
    }
  }, [inputData.coverImg]);

  return (
    <div className="my-5">
      <div className="d-flex justify-content-between">
        <h4>
          <b>My Projects</b>
        </h4>
        <button className="btn btn-danger" onClick={handleShow}>
          Add Project
        </button>
      </div>
      <Project />

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="addproject-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex align-items-center">
              <div>
                <label htmlFor="img1">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="img1"
                    name="coverImg"
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        coverImg: e.target.files[0],
                      })
                    }
                  />
                  <img
                    className="w-100"
                    src={
                      inputData.coverImg
                        ? preview
                        : "https://i.postimg.cc/m2S8rVhx/image-removebg-preview-22.png"
                    }
                    alt=""
                    style={{ objectFit: "contain" }}
                  />
                </label>
              </div>
            </Col>
            <Col className="typing">
              <input
                type="text "
                className="border-0"
                placeholder="Project Name"
                name="title"
                onChange={setInputs}
                value={inputData.title}
              />
              <hr />
              <input
                type="text"
                className="border-0 "
                placeholder="Language used"
                name="technologies"
                onChange={setInputs}
                value={inputData.technologies}
              />
              <hr />
              <input
                type="text"
                className="border-0"
                placeholder="GitHub Link"
                name="gitHub"
                onChange={setInputs}
                value={inputData.gitHub}
              />
              <hr />
              <input
                type="text"
                className="border-0"
                placeholder="Website Link"
                name="website"
                onChange={setInputs}
                value={inputData.website}
              />
              <hr />
            </Col>
            <input
              type="text"
              placeholder="Project Over-view"
              className="border-0"
              name="description"
              onChange={setInputs}
              value={inputData.description}
            />
            <hr />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleaAddProject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Projects;
