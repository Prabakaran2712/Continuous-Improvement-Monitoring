import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Dashboard.module.css";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Dashboard = () => {
  const [teaches, setTeaches] = useState([]);
  const [students, setStudents] = useState([]);

  const auth = useAuthContext();

  useEffect(() => {
    //get all teaches by staff id
    axios.get(`/api/teaches/staff/${auth.user._id}`).then((res) => {
      setTeaches(res.data);
      console.log(res.data);
      //get unique students from teaches
      var students = res.data.map((teach) => teach.students);
      var uniqueStudents = [...new Set(students)];
      setStudents(uniqueStudents);
    });
    //get all courses
  }, []);
  const options = [
    {
      name: "Students",
      value: students.length,
      icon: <FontAwesomeIcon icon={faUser} size="lg" />,
      color: "red",
    },
    {
      name: "GPA",
      value: "9.8",
      icon: <FontAwesomeIcon icon={faPen} size="lg" />,
      color: "green",
    },
    {
      name: "GPA",
      value: "9.8",
      icon: <FontAwesomeIcon icon={faPen} size="lg" />,
      color: "blue",
    },
    {
      name: "GPA",
      value: "9.8",
      icon: <FontAwesomeIcon icon={faPen} size="lg" />,
      color: "yellow",
    },
  ];

  return (
    <div className={`${Styles.cards}`}>
      {options.map((option, index) => (
        <DashboardCard key={index} options={option} color={option.color} />
      ))}
    </div>
  );
};

export default Dashboard;
