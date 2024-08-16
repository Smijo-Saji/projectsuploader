import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { base_url } from "../services/baseUrl";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { editProjectApi } from "../services/allApis";
import { editResponseContext } from "../services/ContextShare";

function EditProject({ project }) {
  const { setEditUpdate } = useContext(editResponseContext);

  const [show, setShow] = useState(false);

  const [inputData, setInputData] = useState({
    _id: project?._id,
    title: project?.title,
    description: project?.description,
    technologies: project?.technologies,
    website: project?.website,
    gitHub: project?.gitHub,
    coverImg: "",
  });

  const [preview, setPreview] = useState("");

  const handleClose = () => {
    setShow(false);
    setInputData({
      _id: project?._id,
      title: project?.title,
      description: project?.description,
      technologies: project?.technologies,
      website: project?.website,
      gitHub: project?.gitHub,
      coverImg: "",
    });
  };
  const handleShow = () => {
    setInputData({
      _id: project?._id,
      title: project?.title,
      description: project?.description,
      technologies: project?.technologies,
      website: project?.website,
      gitHub: project?.gitHub,
      coverImg: "",
    });
    setShow(true);
  };

  const setInputs = (e) => {
    let { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  useEffect(() => {
    if (inputData.coverImg) {
      setPreview(URL.createObjectURL(inputData.coverImg));
    } else {
      setPreview("");
    }
  }, [inputData.coverImg]);

  const handleEditProject = async () => {
    const { title, description, technologies, website, gitHub, coverImg, _id } =
      inputData;
    if (!title || !description || !technologies || !website || !gitHub) {
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
        console.log(token);
        const header = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          access_token: `Bearer ${token}`,
        };
        //body- form data
        const body = new FormData();
        body.append("title", title);
        body.append("description", description);
        body.append("technologies", technologies);
        body.append("website", website);
        body.append("gitHub", gitHub);
        preview
          ? body.append("coverImg", coverImg)
          : body.append("coverImg", project.coverImg);

        const result = await editProjectApi(header, body, _id);
        if (result.status == 200) {
          toast.success("Update Success", {
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
          setEditUpdate((prev) => !prev);

          handleClose();
        } else {
          toast.error("Update Failed", {
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

  return (
    <div>
      <i className="fa-solid fa-pen-to-square" onClick={handleShow}></i>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="addproject-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
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
                        : `${base_url}/images/${project?.coverImg}`
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
          <Button variant="primary" onClick={handleEditProject}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default EditProject;
