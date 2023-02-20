import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-4"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* //! Checking if the user is already logged in to show the my orders page */}
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-4"
                    aria-current="page"
                    to="/"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            <div className="d-flex ">
              {localStorage.getItem("token") ? (
                <>
                  <Link className="btn bg-white text-success mx-1" to="/">
                    My Cart
                  </Link>
                  <div
                    className="btn bg-white text-danger mx-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>

                  <Link
                    className="btn bg-white text-success mx-1"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
