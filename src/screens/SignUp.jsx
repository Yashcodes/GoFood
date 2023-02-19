import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  let naviagte = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hostName = "http://localhost:5000/api";

    const response = await fetch(`${hostName}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      naviagte("/");
    }
    else {
      alert("Invalid Credentials")
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="Username"
            name="name"
            value={credentials.name}
            onChange={handleOnChange}
          />
        </div>
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
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
        <div className="mb-3">
          <label htmlFor="geolocation" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="geolocation"
            name="geolocation"
            value={credentials.geolocation}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="submitBtn" />
          <label className="form-check-label" htmlFor="submitBtn">
            Create account
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link className=" mx-3 btn btn-success" to="/login">
          Already a user
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
