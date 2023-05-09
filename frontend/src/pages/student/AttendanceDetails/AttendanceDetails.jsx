import { useParams } from "react-router-dom";
import Calendar from "../../../components/Calendar/Calendar";
import Styles from "./AttendanceDetails.module.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import axios from "axios";
import Title from "../../../components/forms/Title/Title";
import SubjectData from "../../../components/SubjectData/SubjectData";
import AttendanceReport from "../../../components/Report/AttendanceReport/AttendanceReport";

const AttendanceDetails = () => {
  const auth = useAuthContext();
  const { id } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teaches, setTeaches] = useState({});
  const [value, setValue] = useState(new Date());
  const [presentDays, setPresentDays] = useState([]);
  const [absentDays, setAbsentDays] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]); //attendance of selected date
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date().getDate());

  useEffect(() => {
    //get teaches by id
    axios

      .get(`/api/teaches/${id}`)
      .then((res) => {
        setTeaches(res.data);
        axios
          .get(`/api/attendances/student/${auth.user._id}/teaches/${id}`)
          .then((att) => {
            var count = 0;
            var present = 0;
            att.data.forEach((x) => {
              if (x.present) {
                present++;
              }
              count++;
            });
            var percentage = (present / count) * 100;
            setReportData({
              noOfClasses: count,
              present: present,
              absent: count - present,
              percentage: percentage,
            });
            setAttendance(att.data);
            //get present days and absent days for dates in current month and year
            const presentDays = [];
            const absentDays = [];
            att.data.forEach((x) => {
              //get current month and year
              var date = new Date().getDate();
              var month = new Date().getMonth();
              var year = new Date().getFullYear();
              const atdate = new Date(x.class.date);
              if (
                atdate.getMonth() === month &&
                atdate.getFullYear() === year
              ) {
                if (x.present) {
                  presentDays.push(atdate.getDate());
                } else {
                  absentDays.push(atdate.getDate());
                }
              }
            });

            setPresentDays(presentDays);
            setAbsentDays(absentDays);

            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className={`${Styles.subjectData}`}>
        <SubjectData courseData={teaches.course} />
      </div>
      <div className="row  mx-auto align-items-center my-5">
        <div className="report w-75 mx-auto ">
          <AttendanceReport reportData={reportData} />
        </div>
        <div className="calendarOptions row align-items-center mx-auto">
          <div className={`${Styles.calendar} col-6`}>
            <Calendar
              value={value}
              presentDays={presentDays}
              absentDays={absentDays}
              onViewChange={() => {
                console.log("view change");
              }}
              //month change

              onMonthChange={(monthDate) => {
                console.log("month change");
                console.log(monthDate.getMonth());

                //   //get new present days and absent days for dates in current month and year

                const presentDays = [];
                const absentDays = [];
                attendance.forEach((x) => {
                  //get current month and year
                  const atdate = new Date(x.class.date);
                  const month = atdate.getMonth();
                  const year = atdate.getFullYear();

                  if (
                    monthDate.getMonth() === month &&
                    monthDate.getFullYear() === year
                  ) {
                    if (x.present) {
                      presentDays.push(atdate.getDate());
                    } else {
                      absentDays.push(atdate.getDate());
                    }
                  }
                });

                setPresentDays(presentDays);
                setAbsentDays(absentDays);
              }}
              onChange={(newValue) => {
                setValue(newValue);

                //get attendance of selected date month and year

                const filteredAttendance = attendance.filter((x) => {
                  const date = new Date(x.class.date);

                  return (
                    date.getDate() === newValue.getDate() &&
                    date.getMonth() === newValue.getMonth() &&
                    date.getFullYear() === newValue.getFullYear()
                  );
                });
                setFilteredAttendance(filteredAttendance);
              }}
            />
          </div>
          <div className="classList col-6">
            {filteredAttendance.length == 0 ? (
              <div className="mx-auto fs-5 text-center">
                No Class on this Day
              </div>
            ) : (
              ""
            )}
            {filteredAttendance.map((x) => {
              return (
                <div className="table">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Present</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={Math.random()}>
                        <td>{new Date(x.class.date).toLocaleDateString()}</td>
                        <td>{x.class.time}</td>
                        <td>{x.present ? "Present" : "Absent"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;
