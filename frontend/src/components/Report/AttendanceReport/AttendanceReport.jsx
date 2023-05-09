import Styles from "./AttendanceReport.module.css";

const AttendanceReport = ({ reportData }) => {
  return (
    <div className={`${Styles.attendanceReport} mx-3 mb-5`}>
      <div className="heading row   mb-3 text-center">
        <h2>Attendance Report</h2>
      </div>
      <hr />
      <div className={`${Styles.reportContent} row justify-content-center`}>
        <div className="col-5">
          <div>
            <span>No of Classes : </span> {reportData.noOfClasses}
          </div>
          <div>
            <span>Present : </span> {reportData.present}
          </div>

          <div>
            <span>Absent : </span>
            {reportData.absent}
          </div>
        </div>
        <div className="col-5">
          <div>
            <span>Percentage : </span> {reportData.percentage}
          </div>
          <div>
            <span>Status : </span>{" "}
            {reportData.percentage < 75 ? (
              <span style={{ color: "rgb(249, 64, 64)" }}>
                Shortage of Attendance
              </span>
            ) : (
              <span style={{ color: "rgb(125, 179, 100)" }}>Good Standing</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
