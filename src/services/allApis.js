import { base_url } from "./baseUrl";
import { commonStructure } from "./commonStructure";

//register
export const registerApi = async (body) => {
  return await commonStructure("POST", `${base_url}/user/register`, body);
};

//login
export const loginApi = async (body) => {
  return await commonStructure("POST", `${base_url}/user/login`, body);
};

//add project
export const addProjectApi = async (body, header) => {
  return await commonStructure(
    "POST",
    `${base_url}/user/add-project`,
    body,
    header
  );
};

//getting 3 projects
export const getHomeProjects = async () => {
  return await commonStructure("GET", `${base_url}/home-projects`, {});
};

//getting all projects
//for searching using node we pass query params
export const getAllProjects = async (searchData) => {
  return await commonStructure(
    "GET",
    `${base_url}/explore-projects?search=${searchData}`,
    {}
  );
};

//getting project for specific user

export const getUserProjects = async (header) => {
  return await commonStructure("GET", `${base_url}/user-projects`, {}, header);
};

//edit project
export const editProjectApi = async (header, body, id) => {
  return await commonStructure(
    "PUT",
    `${base_url}/user/edit-project/${id}`,
    body,
    header
  );
};

//deleteProject

export const deleteProject = async (header, id) => {
  return await commonStructure(
    "DELETE",
    `${base_url}/user/delete-project/${id}`,
    {},
    header
  );
};

//edit profile
export const editProfileApi = async (header, body, id) => {
  return await commonStructure(
    "PUT",
    `${base_url}/user/edit-profile/${id}`,
    body,
    header
  );
};
