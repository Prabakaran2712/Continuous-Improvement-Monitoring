import logo from "../../assets/annaUniv.svg";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg m-0 py-lg-3 display h5">
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active py-7 px-4" to="/">
                HOME
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className="collapse navbar-collapse justify-content-end"
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
                className="dropdown-menu fs-5"
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
              </ul>
            </li>
            <li className="nav-item dropdown mx-2 ">
              <button
                className="btn btn-dark btn-lg dropdown-toggle py-7 px-5 nav-link dropdown-toggle py-7 px-5"
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
                className="dropdown-menu fs-5"
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
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
