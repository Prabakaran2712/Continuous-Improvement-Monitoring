import Styles from "./Dropdown.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleDropdownClick() {
    setIsOpen(!isOpen);
  }
  return (
    <div className={`${Styles.dropdown}`}>
      <div className={`${Styles.dropdownBtn}`} onClick={handleDropdownClick}>
        <div>
          <h4>{props.option.name}</h4>
          <small>{props.option.role}</small>
        </div>
      </div>
      {isOpen && (
        <div className={`${Styles.dropdownContent}`}>
          {props.option.items.map((item, index) => (
            <Link to={item.link} key={index}>
              {item.icon} {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
