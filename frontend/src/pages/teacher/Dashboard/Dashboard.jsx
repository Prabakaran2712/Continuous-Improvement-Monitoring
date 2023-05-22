import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPen,
  faBookAtlas,
  faBlackboard,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./Dashboard.module.css";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { set } from "mongoose";
import Loading from "../../../components/Loading/Loading";

const Dashboard = () => {
  const [teaches, setTeaches] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialStudents, setSpecialStudents] = useState([]);
  const [attendanceStudents, setAttendanceStudents] = useState([]);

  const navigate = useNavigate();
  const auth = useAuthContext();

  useEffect(() => {
    //get all teaches by staff id
    axios.get(`/api/teaches/staff/${auth.user._id}`).then((res) => {
      setTeaches(res.data);
      const temp_teaches = res.data;
      //get unique students from teaches
      var students = res.data.map((teach) => teach.students);
      var uniqueStudents = [...new Set(students)];
      setStudents(uniqueStudents);
      //get all exams with staff id
      axios.get(`/api/exams/teacher/${auth.user._id}`).then((res) => {
        setExams(res.data);
      });
      //get classes witj teacher id
      axios.get(`/api/classes/teacher/${auth.user._id}`).then((res) => {
        setClasses(res.data);
      });
      let mark = [];
      //get marks of students in teaches
      axios.get(`/api/marks/teacher/${auth.user._id}`).then((res) => {
        mark = res.data;
      });
      //set students with less than 50% Marks as special students
      let spStudents = [];
      let freq = [];
      mark.map((m) => {
        console.log((m.marks / m.exam.total_marks) * 100);
        if ((m.marks / m.exam.total_marks) * 100 > 50) {
          con;
          spStudents.push(m.student);
          freq[m.student] = freq[m.student] + 1;
          setSpecialStudents((prev) => [...prev, m.student]);
        }
      });
      console.log(spStudents);
      console.log(freq);

      setLoading(false);
    });

    //get all courses
  }, []);
  const options = [
    {
      name: "Students",
      value: students.length,
      icon: <FontAwesomeIcon icon={faUser} size="2x" />,
      color: "red",
      onClick: () => {
        navigate("/teacher/students");
      },
    },
    {
      name: "Exams",
      value: exams.length,
      icon: <FontAwesomeIcon icon={faPen} size="lg" />,
      color: "green",
      onClick: () => {
        navigate("/teacher/exams");
      },
    },
    {
      name: "Classes",
      value: classes.length,
      icon: <FontAwesomeIcon icon={faBlackboard} size="lg" />,
      color: "blue",
      onClick: () => {
        navigate("/teacher/class");
      },
    },
    {
      name: "Courses",
      value: teaches.length,
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

export default Dashboard;
