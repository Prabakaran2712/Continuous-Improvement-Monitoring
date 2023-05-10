import { useEffect } from "react";
import Container from "../../../components/Container/Container";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen } from "@fortawesome/free-solid-svg-icons";

const StudentDasboard = () => {
  const options = [
    {
      name: "Students",
      value: "54",
      icon: <FontAwesomeIcon icon={faUser} size="lg" />,
    },
    {
      name: "GPA",
      value: "9.8",
      icon: <FontAwesomeIcon icon={faPen} size="lg" />,
    },
    {
      name: "GPA",
      value: "9.8",
      icon: <FontAwesomeIcon icon={faPen} size="lg" />,
    },
    {
      name: "GPA",
      value: "9.8",
      icon: <FontAwesomeIcon icon={faPen} size="lg" />,
    },
  ];

  useEffect(() => {
    //need gpa data
    //need marks data
    //need courses data
    //need attendance data
  }, []);

  return (
    <div className="cards ">
      {options.map((option, index) => (
        <DashboardCard key={index} options={option} />
      ))}
    </div>
  );
};

export default StudentDasboard;
