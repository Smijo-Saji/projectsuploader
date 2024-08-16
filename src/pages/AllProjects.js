import React, { useEffect, useState } from "react";
import "./AllProjects.css";
import { Container } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard";
import Header from "../components/Header";
import { getAllProjects } from "../services/allApis";

function AllProjects() {
  const [exploreProjects, setExploreProjects] = useState([]);
  const [searchData, setSearchData] = useState("");
  const getExploreProjects = async () => {
    const res = await getAllProjects(searchData);
    setExploreProjects(res.data);
  };

  useEffect(() => {
    getExploreProjects();
  }, [searchData]);

  console.log(exploreProjects);

  return (
    <div className="AllProjects">
      <Header />
      <div className="my-4">
        <Container>
          <h2 className="text-center mb-4">All Projects</h2>
          <input
            type="text"
            className="form-control"
            placeholder="Search for Technologies...."
            onChange={(e) => setSearchData(e.target.value)}
          />
          <div className="d-flex gap-4 flex-wrap my-4 justify-content-center">
            {exploreProjects.length > 0 ? (
              exploreProjects.map((i) => <ProjectCard data={i} />)
            ) : (
              <h5>No Projects</h5>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AllProjects;
