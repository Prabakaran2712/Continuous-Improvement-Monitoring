const MarkReport = (props) => {
  return (
    <div className="report">
      <div className="header">
        <h1>MarkReport</h1>
      </div>
      <div className="body">
        <div className="row">
          <div className="col">Total Number of Students : </div>
          {props.data.count}
        </div>
        <div className="row">
          <div className="col-1">#</div>
          <div className="col-5">Your Marks</div>
          <div className="col-5">Class Average</div>
        </div>
        {props.data.marks.map((mark, index) => {
          return (
            <div className="row">
              <div className="col-1">{mark.name}</div>
              <div className="col-5">{mark.marks}</div>
              <div className="col-5">{mark.average}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarkReport;
