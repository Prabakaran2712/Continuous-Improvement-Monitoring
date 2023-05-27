import { React } from "react";
import styles from "./Home.module.css";
import image from "../../assets/background.png";
import vectorImage from "../../assets/hero.webp";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

const Home = () => {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 text-center text-lg-end">
          <div className="display-6">Empowering Success Through</div>
          <div className="display-3">Continuous Monitoring</div>
        </div>
        <div className="col-lg-3">
          <img src={image} alt="background" className="img-fluid" />
        </div>
      </div>
      <div className="my-3">
        <p className="lead">
          A seamless and efficient platform for both students and teachers to
          monitor and track their academic progress.
        </p>
      </div>
      <div className="mt-4">
        <div className="display-6 text-center">Key Features</div>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={vectorImage} alt="hero" className="img-fluid" />
          </div>
          <div className="col-md-6 lh-lg fs-5">
            <ul>
              <li>
                <DoneIcon />
                Personalized Dashboard
              </li>
              <li>
                <DoneIcon />
                Grades and Performance Analysis
              </li>
              <li>
                <DoneIcon />
                Attendance Tracking
              </li>
              <li>
                <DoneIcon />
                Course Management
              </li>
              <li>
                <DoneIcon />
                Exam Schedule and Results
              </li>
              <li>
                <DoneIcon />
                Teacher-Student Interaction
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-3">
        Whether you're a student striving for excellence or a teacher dedicated
        to guiding and nurturing your students, our system is designed to
        simplify and enhance the learning experience.
      </div>
      <div className="my-3">
        <div className="display-6 text-center my-3">Get Started</div>
        <div className="row align-items-center text-center">
          <div className="col-3"></div>
          <div className="col-3">
            <div className={`d-grid gap-2 rounded p-3 ${styles.links}`}>
              <Link to="/auth/student/signin" type="button">
                <SchoolIcon />
                Student Login
              </Link>
            </div>
          </div>
          <div className="col-3">
            <div className={`d-grid gap-2 ${styles.links} rounded p-3`}>
              <Link to="auth/teacher/signin" type="button">
                <PersonIcon />
                Teacher Login
              </Link>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
};
export default Home;
