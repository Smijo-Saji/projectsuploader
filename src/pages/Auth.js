import React, { useContext, useEffect, useState } from "react";
import "./Auth.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/allApis";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokenAuthContext } from "../services/AuthContext";

function Auth({ register }) {
  const { setIsAuth } = useContext(tokenAuthContext);
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  //state to check valid
  const [validUname, setValidUname] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setUserInputs({
      username: "",
      email: "",
      password: "",
    });
    setValidUname(false);
    setValidEmail(false);
    setValidPassword(false);
  }, []);

  const setData = (e) => {
    let { name, value } = e.target;

    if (name === "username") {
      if (value.match(/^[a-zA-Z ]+$/)) {
        setValidUname(false);
        // setUserInputs({ ...userInputs, [name]: value });
      } else {
        setValidUname(true);
      }
    }
    if (name === "email") {
      if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        setValidEmail(false);
        // setUserInputs({ ...userInputs, [name]: value });
      } else {
        setValidEmail(true);
      }
    }
    if (name === "password") {
      if (value.match(/^[a-zA-Z0-9]{5,}$/)) {
        setValidPassword(false);
        // setUserInputs({ ...userInputs, [name]: value });
      } else {
        setValidPassword(true);
      }
    }
    setUserInputs({ ...userInputs, [name]: value });
  };
  console.log(userInputs);

  let validator = validEmail || validUname || validPassword;

  const handleRegister = async () => {
    const { username, email, password } = userInputs;
    if (!username || !email || !password) {
      toast.warn("Please Fill All Details!", {
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
      const res = await registerApi(userInputs);
      if (res.status == 201) {
        toast.success(res.data, {
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

        setUserInputs({ username: "", email: "", password: "" });
        navigate("/authentication");
      } else {
        toast.error(res.response.data, {
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

        navigate("/authentication");
      }
    }
  };
  // useEffect(() => {
  //   if (validEmail || validPassword || validUname) {
  //     document.getElementById("signup").disabled = true;
  //   } else {
  //     document.getElementById("signup").disabled = false;
  //   }
  // }, [validEmail, validUname, validPassword]);

  const handleLogin = async () => {
    const { email, password } = userInputs;
    if (!email || !password) {
      toast.warn("Please Fill All Details!", {
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
      const res = await loginApi(userInputs);
      if (res.status === 200) {
        //if login success store username  and id in local storage
        localStorage.setItem("currentUser", res.data.user.username);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("token", res.data.token);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success(res.data.message, {
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
        setIsAuth(true);
        navigate("/");
      } else {
        toast.error(res.response.data, {
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
  };

  return (
    <div className="py-4 auth">
      <Container>
        <Link to={"/"}>
          <div className="back-button">
            <h5>
              <i class="fa-solid fa-angles-left me-2"></i>Back to Home
            </h5>
          </div>
        </Link>

        <Row className="m-5">
          <Col lg={6} className="auth-left">
            {register ? (
              <img
                src="https://i.postimg.cc/DynDKMxk/Sign-up-amico.png"
                alt=""
              />
            ) : (
              <img
                src="https://i.postimg.cc/9Xb0dzg6/Tablet-login-amico.png"
                alt=""
              />
            )}
          </Col>
          <Col lg={6} className="auth-right p-4">
            {register ? <h2>Sign - Up</h2> : <h2>Sign - In</h2>}
            {register && (
              <>
                <input
                  type="text"
                  name="username"
                  className="form-control "
                  placeholder="User-name"
                  onChange={(e) => setData(e)}
                  value={userInputs.username}
                />
                {validUname && (
                  <p className="text-danger">
                    please include alphabets and spaces only
                  </p>
                )}
              </>
            )}
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email - Id
              "
              onChange={(e) => setData(e)}
              value={userInputs.email}
            />
            {validEmail && (
              <p className="text-danger">Please enter a valid email</p>
            )}
            <input
              type="password"
              name="password"
              className="form-control pswd"
              placeholder="Password"
              onChange={(e) => setData(e)}
              value={userInputs.password}
            />
            {validPassword && (
              <p className="text-danger">Please Enter a valid Password</p>
            )}
            {register ? (
              <button
                className="button-register"
                id="signup"
                disabled={validator}
                onClick={handleRegister}
              >
                Register
              </button>
            ) : (
              <button
                className="button-register"
                id="signup"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
            {register ? (
              <label className="mt-3 text-white">
                Already Registeres ?{" "}
                <Link to={"/authentication"}>Login-In Here</Link>
              </label>
            ) : (
              <label className="mt-3 text-white">
                New User ? <Link to={"/register"}>Register Here</Link>
              </label>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Auth;
