import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hostName = "http://localhost:5000/api";

    const response = await fetch(`${hostName}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("token", json.authToken);
      console.log(localStorage.getItem("token"));
      navigate("/");
    } else {
      alert("Enter valid credentials");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link className=" mx-3 btn btn-success" to="/createuser">
          Don't have an account
        </Link>
      </form>
    </div>
  );
};

export default Login;
