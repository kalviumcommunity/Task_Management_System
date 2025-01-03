import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const validateInputs = (...fields) => {
    for (const field of fields) {
      if (!field || field.trim() === "") {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs(email1, password1)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email: email1,
        password: password1,
      });
      
      const { token, role } = response.data;
      localStorage.setItem("authToken", token); // Store JWT in localStorage

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/main");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (!validateInputs(username, email, password)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/signup", {
        username,
        email,
        password,
      });

      if (response.data.status) {
        navigate("/main");
      } else {
        setErrorMessage("Email already exists.");
      }
    } catch (err) {
      setErrorMessage("Sign-up failed. Try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log" />
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-group">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            autoComplete="off"
                            onChange={(e) => setEmail1(e.target.value)}
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            autoComplete="off"
                            onChange={(e) => setPassword1(e.target.value)}
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button className="btn mt-4" onClick={handleSubmit}>
                          Submit
                        </button>
                        <p className="mb-0 mt-4 text-center">
                          <Link to="/forgot-password" className="link">
                            Forgot your password?
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Your Full Name"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <i className="input-icon uil uil-user" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button className="btn mt-4" onClick={handleSubmit2}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn mt-4" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
