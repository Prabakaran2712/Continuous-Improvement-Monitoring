import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPen,
  faBookAtlas,
  faBlackboard,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./StudentDashboard.module.css";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loading from "../../../components/Loading/Loading";
const calculateGPA = (grades) => {
  let totalCredits = 0;
  let totalPoints = 0;
  //grade points for grades
  const gradePoints = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6 };
  //filter grades that have been published
  grades = grades.filter((grade) => grade.teaches.isPublished);
  //filter out grades that are NA
  grades = grades.filter((grade) => grade.grade != "NA");
  grades.forEach((grade) => {
    if (grade.grade == "RA") return;
    totalCredits += grade.teaches.course.credits;
    totalPoints += grade.teaches.course.credits * gradePoints[grade.grade];
  });
  return totalPoints / totalCredits;
};

const StudentDashboard = () => {
  const [gpa, setGpa] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = useAuthContext();

  useEffect(() => {
    axios
      .get(`/api/grades/student/${auth.user._id}`)
      .then((res) => {
        setGpa(calculateGPA(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    //get all courses
  }, []);
  const options = [
    {
      name: "CGPA",
      value: gpa,
      icon: <FontAwesomeIcon icon={faUser} size="2x" />,
      color: "red",
      onClick: () => {
        navigate("/teacher/students");
      },
    },
    {
      name: "Courses",
      value: gpa,
      icon: <FontAwesomeIcon icon={faPen} size="lg" />,
      color: "green",
      onClick: () => {
        navigate("/teacher/exams");
      },
    },
    {
      name: "Backlogs",
      value: gpa,
      icon: <FontAwesomeIcon icon={faBlackboard} size="lg" />,
      color: "blue",
      onClick: () => {
        navigate("/teacher/class");
      },
    },
    {
      name: "Attendace Shortage",
      value: gpa,
      icon: <FontAwesomeIcon icon={faGraduationCap} size="lg" />,
      color: "yellow",
      onClick: () => {
        navigate("/teacher/courses");
      },
    },
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`${Styles.cards}`}>
      {options.map((option, index) => (
        <DashboardCard
          key={index}
          title={option.name}
          color={option.color}
          icon={option.icon}
          value={option.value}
          onClick={() => {
            option.onClick && option.onClick();
          }}
        />
      ))}
    </div>
  );
};

export default StudentDashboard;
