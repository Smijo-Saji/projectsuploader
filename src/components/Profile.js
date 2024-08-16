import React, { useContext, useEffect, useState } from "react";
import { base_url } from "../services/baseUrl";
import { editProfileApi } from "../services/allApis";
import { profileUpdateContext } from "../services/ContextShare";

function Profile() {
  const { editProfile, setEditProfile } = useContext(profileUpdateContext);
  const [open, setOpen] = useState(true);

  const [profile, setProfile] = useState({
    email: "",
    gitHub: "",
    linkedIn: "",
    username: "",
    profileImg: "",
    _id: "",
  });

  //update ane mathram profile state save cheyan string type and object type seperate store cheyan

  const [existingImg, setExistingImg] = useState("");

  const [preview, setPreview] = useState("");

  console.log(profile);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));

      setProfile({
        ...profile,
        email: user?.email,
        gitHub: user?.gitHub,
        linkedIn: user?.linkedIn,
        username: user?.username,
        _id: user._id,
      });

      setExistingImg(user.profile);
    }
  }, [editProfile]);

  useEffect(() => {
    if (profile.profileImg) {
      setPreview(URL.createObjectURL(profile.profileImg));
    } else {
      setPreview("");
    }
  }, [profile.profileImg]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { username, gitHub, linkedIn, profileImg, _id } = profile;
    const token = localStorage.getItem("token");
    if (token) {
      //header
      const header = {
        "Content-Type": preview ? "multipart/form-data" : "application/json",
        access_token: `Bearer ${token}`,
      };
      //body
      const body = new FormData();
      body.append("username", username);
      body.append("gitHub", gitHub);
      body.append("linkedIn", linkedIn);

      preview
        ? body.append("profile", profileImg)
        : body.append("profile", existingImg);

      const res = await editProfileApi(header, body, _id);
      if (res.status == 200) {
        setOpen((prev) => !prev);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("currentUser", res.data.username);
        setEditProfile((prev) => !prev);
      }
    }
  };
  return (
    <div>
      {open ? (
        <div className="p-2 border rounded py-3">
          <div className="d-flex justify-content-between align-items-center px-4">
            <h5>My Profile</h5>
            <i
              className="fa-solid fa-circle-check  active"
              style={{ color: "#39FF14" }}
            ></i>
          </div>
          <div className="d-flex justify-content-center align-items-center profile-icon mb-5 ">
            <img
              src={
                existingImg == ""
                  ? "https://i.postimg.cc/XJV17FL7/image-removebg-preview-21.png"
                  : `${base_url}/images/${existingImg}`
              }
              alt=""
            />
          </div>
          <div className="profile-desc">
            <hr />
            <p>
              <b>User </b>: {profile.username}
            </p>
            <hr />
            <p>
              <b>GitHub</b> : {profile.linkedIn}
            </p>
            <hr />
            <p>
              <b>LinkedIn </b>: {profile.gitHub}
            </p>
            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn-danger"
                onClick={() => setOpen((prev) => !prev)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 border rounded py-3">
          <div className="d-flex justify-content-between align-items-center px-4">
            <h5>My Profile</h5>
            <i
              className="fa-solid fa-circle-check  active"
              style={{ color: "#39FF14" }}
            ></i>
          </div>
          <div className="d-flex justify-content-center align-items-center profile-icon mb-5 ">
            <label htmlFor="imgpicker">
              <input
                type="file"
                style={{ display: "none" }}
                id="imgpicker"
                onChange={(e) =>
                  setProfile({ ...profile, ["profileImg"]: e.target.files[0] })
                }
              />
              {existingImg === "" ? (
                <img
                  className="w-100 rounded-circle"
                  src={
                    preview
                      ? preview
                      : "https://i.postimg.cc/m2S8rVhx/image-removebg-preview-22.png"
                  }
                  alt=""
                />
              ) : (
                <img
                  className="w-100 rounded-circle"
                  src={preview ? preview : `${base_url}/images/${existingImg}`}
                  alt="alt"
                />
              )}
            </label>
          </div>
          <div className="profile-desc">
            <hr />
            <p>
              <b>User </b>:{" "}
              <input
                type="text"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, ["username"]: e.target.value })
                }
                name="username"
              />
            </p>
            <hr />
            <p>
              <b>GitHub</b> :{" "}
              <input
                type="text"
                value={profile.gitHub}
                onChange={(e) =>
                  setProfile({ ...profile, ["gitHub"]: e.target.value })
                }
                name="gitHub"
              />
            </p>
            <hr />
            <p>
              <b>LinkedIn </b>:{" "}
              <input
                type="text"
                value={profile.linkedIn}
                onChange={(e) =>
                  setProfile({ ...profile, ["linkedIn"]: e.target.value })
                }
                name="linkedIn"
              />
            </p>
            <div className="d-flex justify-content-center mt-5">
              <button
                className="btn btn-success  "
                onClick={(e) => handleUpdate(e)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
