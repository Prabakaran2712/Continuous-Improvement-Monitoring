const ChatDetails = (props) => {
  return (
    <div className="chatDetails">
      <div className="chatDetailsHeader">
        |<h3>{props.title}</h3>
        <p>{props.name}</p>
      </div>
    </div>
  );
};

export default ChatDetails;
