import logo from "../assets/annaUniv.svg";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg m-0 py-lg-3 display h4">
      <div className="container-fluid">
        <NavLink className="nav-link" to="#">
          <img
            src={logo}
            style={{ width: "100px", height: "100px" }}
            alt="logo"
            className="logo"
          />
        </NavLink>
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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active py-7 px-4" to="/">
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link py-7 px-4" to="#">
                ABOUT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link py-7 px-4" to="#">
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown mx-2">
              <NavLink
                className="nav-link dropdown-toggle py-7 px-5"
                to="#"
                id="navDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                LOG IN
              </NavLink>
              <ul
                className="dropdown-menu fs-4"
                aria-labelledby="navbarDropdown"
              >
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
            <li className="nav-item dropdown mx-2">
              <button
                class="btn btn-dark btn-lg dropdown-toggle py-7px-5"
                className="nav-link dropdown-toggle py-7 px-5"
                to="#"
                id="navDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  background: "black",
                  color: "white",
                  borderRadious: "100px",
                }}
              >
                SIGN UP
              </button>
              <ul
                className="dropdown-menu fs-4"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <NavLink className="dropdown-item" to="auth/student/signup">
                    Student
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="auth/teacher/signup">
                    Teacher
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="auth/admin/signup">
                    Admin
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
