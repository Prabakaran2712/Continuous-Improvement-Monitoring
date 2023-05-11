import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Dashboard.module.css";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
const Dashboard = () => {
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

  return (
    <div className={`${Styles.cards}`}>
      {options.map((option, index) => (
        <DashboardCard key={index} options={option} color={"green"} />
      ))}
    </div>
  );
};

export default Dashboard;
