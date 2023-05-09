import { React } from "react";
import styles from "./Home.module.css";
import image from "../../assets/background.png";

const Home = () => {
  return (
    <div>
      <img src={image} alt="background" className={`${styles.image}`} />
      <div>
        <h2 className={`display-1 px-5 pt-5 ${styles.heroText}`}>
          Department of Information
        </h2>
        <h2 className={`display-1 px-5 ${styles.heroText}`}>Technology...</h2>
        <p className={`display-5 px-5`}>Make your learning more enjoyable</p>
      </div>
      <div className={`display-5 px-5 ${styles.button}`}>
        <a href="auth/student/signup">
          <button type="button" className="btn btn-dark btn-lg px-4">
            GET STARTED
          </button>
        </a>
      </div>
    </div>
  );
};
export default Home;
