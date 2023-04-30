import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading mx-auto ">
      <div className="loader mx-auto my-5">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        className="
    loader-text text-center 
    "
      >
        Loading
      </div>
    </div>
  );
};

export default Loading;
