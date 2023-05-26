import Title from "../../forms/Title/Title";
import Styles from "./Header.module.css";
const Header = (props) => {
  return (
    <div
      className={`header d-flex flex-row justify-content-between  mt-sm-1 mx-lg-5 ${Styles.header}`}
    >
      <div className={`${Styles.title}`}>
        <Title title={props.title} size={props.size} />
      </div>

      <div className="options d-flex flex-row justify-content-end m-lg-2">
        {props.buttons &&
          props.buttons.map((button) => (
            <div className="button mx-2" key={Math.random()}>
              {button}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;
