const DeleteButton = (props) => {
  return (
    <button
      className="btn btn-outline-danger"
      onClick={() => {
        props.delete(props.id);
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
