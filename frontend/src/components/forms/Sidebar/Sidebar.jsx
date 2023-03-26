import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

//styles
import style from "./Sidebar.module.css";

const SideBar = (props) => {
  return (
    <div className={`col-2 shadow display gx-0 ${style.text} ${style.main}`}>
      <div className={`${style.logo}`}>
        <FontAwesomeIcon icon={faChartLine} />C<span>I</span>M
      </div>
      <div className={""}>
        <ul className={`${style.list}`}>
          {props.elements.map((item, i) => {
            return (
              <li key={i} className={`${style.list - item}`}>
                <Link to={item.link}>
                  <span className="mx-2">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
