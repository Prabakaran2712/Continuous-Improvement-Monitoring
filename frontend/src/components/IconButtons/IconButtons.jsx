const IconButton = () => {
  return (
    <button className={`${Styles.btn}`} onClick={props.onClick}>
      <FontAwesomeIcon
        icon={props.icon}
        rotation={270}
        size={"2xl"}
        className={`${Styles.icon}`}
      />
    </button>
  );
};

export default IconButton;
