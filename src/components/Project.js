import React, { useContext, useEffect, useState } from "react";
import { deleteProject, getUserProjects } from "../services/allApis";
import {
  addResponseContext,
  editResponseContext,
} from "../services/ContextShare";
import EditProject from "./EditProject";

function Project() {
  const { addUpdate } = useContext(addResponseContext);
  const { editUpdate } = useContext(editResponseContext);
  const [projectList, setPorjectList] = useState([]);

  const userProjects = async () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const header = {
        "Content-Type": "application/json",
        access_token: `Bearer ${token}`,
      };
      console.log(token);
      const result = await getUserProjects(header);
      if (result.status === 200) {
        setPorjectList(result.data);
      }
    }
  };

  const deleteSinglePorject = async (id) => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const header = {
        "Content-Type": "application/json",
        access_token: `Bearer ${token}`,
      };
      const res = await deleteProject(header, id);
      console.log(res);
      if (res.status === 200) {
        userProjects();
      } else {
        alert("Delete Failed");
      }
    }
  };

  useEffect(() => {
    userProjects();
  }, [addUpdate, editUpdate]);

  return (
    <>
      {projectList.length > 0 ? (
        projectList.map((i) => (
          <div className="mt-5 d-flex justify-content-between">
            <h5>{i.title}</h5>
            <div className="icons d-flex">
              <EditProject project={i} />
              <a href={i.website}>
                <i className="fa-solid fa-link"></i>
              </a>
              <a href={i.gitHub}>
                <i className="fa-brands fa-github"></i>
              </a>
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteSinglePorject(i._id)}
              ></i>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-5">No Projects Added Yet!!!</p>
      )}
    </>
  );
}

export default Project;
