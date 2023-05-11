import Styles from "./Loading.module.css";
import { CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <div className={`${Styles.loading}`}>
      <h1>Loading . . . </h1>
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loading;
