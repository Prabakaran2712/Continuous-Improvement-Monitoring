import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen } from "@fortawesome/free-solid-svg-icons";
import DashboardCard from "../../components/Dashboard/DashboardCard/DashboardCard";
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
    <div className="cards">
      {options.map((option, index) => (
        <DashboardCard key={index} options={option} />
      ))}
    </div>
  );
};

export default Dashboard;
