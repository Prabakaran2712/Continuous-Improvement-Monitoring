const UpdateButton = (props) => {
  return (
    <button
      className="btn btn-outline-success"
      onClick={() => {
        props.update(props.id);
      }}
    >
      Update
    </button>
  );
};

export default UpdateButton;
