import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Styles from "./SearchBox.module.css";
const SearchBox = (props) => {
  return (
    <div className={`input-group ${Styles.search}`}>
      <div className="form-outline">
        <input
          id="search-input"
          type="search"
          className="form-control"
          placeholder="
        Search 🔍
        "
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

export default SearchBox;
