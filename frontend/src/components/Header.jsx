import logo from "../assets/annaUniv.svg";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <nav className="nav">
        <NavLink className="nav-link  " to="#">
          <img
            src={logo}
            style={{ width: "100px", height: "100px" }}
            alt="logo"
          />
        </NavLink>
        <div className="collge-name d-flex flex-column justify-content-center h4">
          <div>Department of Information Technology</div>
          <div>Anna University , MIT Campus</div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-0 py-lg-3 display h6">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="mx-2 nav-item">
                <NavLink
                  className="nav-link active "
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="#">
                  About
                </NavLink>
              </li>
              <li className="nav-item dropdown mx-2">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign in
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="auth/student/signin">
                      Student
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="auth/teacher/signin">
                      Teacher
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="dropdown-item" to="auth/admin/signin">
                      Admin
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link " to="#" tabIndex="-1">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
