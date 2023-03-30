import { faBars, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";

//styles
import style from "./Sidebar.module.css";

const SideBar = (props) => {
  //toggle sidebar in small screen

  const [isopen, setIsopen] = useState(false);
  const toggle = () => {
    if (isopen) {
      setIsopen(false);
    } else {
      setIsopen(true);
    }
  };

  const openClass = isopen ? style.open : style.close;
  const closeMenu = !isopen ? style.closeMenu : {};
  return (
    <div className={`  col-lg-2 gx-0 ${style.wrapper} ${closeMenu}`}>
      <div className={`${style.menu}`} onClick={toggle}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div
        className={` shadow display gx-0 ${style.text} ${style.main} ${openClass}`}
      >
        <div className={`${style.logo}`}>
          <FontAwesomeIcon icon={faChartLine} />C<span>I</span>M
        </div>
        <div className={""}>
          <ul className={`${style.list}`}>
            {props.elements.map((item, i) => {
              return item.type === "button" ? (
                <li
                  key={i}
                  className={`${style.list - item}`}
                  onClick={() => {
                    item.action();
                  }}
                >
                  <Link>
                    <span className="mx-2">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ) : (
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
    </div>
  );
};

export default SideBar;
