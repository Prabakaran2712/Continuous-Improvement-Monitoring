//Button for viewing a course
const View = (props) => {
  return (
    <button
      className="btn btn-outline-success h-50"
      onClick={() => {
        props.view(props.id);
      }}
    >
      View
    </button>
  );
};

export default View;
