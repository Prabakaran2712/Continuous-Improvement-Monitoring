import Styles from "./DashboardCard.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faCartShopping,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const DashboardCard = (props) => {
  const [color, setColor] = useState(Styles.bgBlue);
  useEffect(() => {
    if (props.color) {
      console.log(props.color);
      if (props.color == "blue") {
        setColor(Styles.bgBlue);
      } else if (props.color == "green") {
        setColor(Styles.bgGreen);
      } else if (props.color == "red") {
        setColor(Styles.bgRed);
      } else if (props.color == "yellow") {
        setColor(Styles.bgYellow);
      } else {
        setColor(Styles.bgBlue);
      }
    } else {
      setColor(Styles.bgBlue);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 col-xl-3">
        <div className={`${Styles.card}  ${Styles.orderCard}  ${color}`}>
          <div className={`${Styles.cardBlock}`}>
            <h6 className="">Orders Received</h6>
            <h4 className={`${Styles.cardBody}`}>
              <span>486</span>
              <FontAwesomeIcon icon={faCartShopping} />
            </h4>
          </div>
          <div className={`${Styles.moreInfo}`}>
            More info{" "}
            <span>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
