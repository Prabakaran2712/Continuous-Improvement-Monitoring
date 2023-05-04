const DashboardCard = (props) => {
  return (
    <div className="cardSingle">
      <div>
        <h1>{props.options.value}</h1>
        <span>{props.options.name}</span>
      </div>
      <span> {props.options.icon}</span>
    </div>
  );
};

export default DashboardCard;
