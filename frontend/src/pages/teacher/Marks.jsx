import axios from "axios";
import { useEffect, useState } from "react";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/marks")
      .then((res) => {
        setMarks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Student Name</th>
                <th scope="col">Roll Number</th>
                <th scope="col">Exam</th>
                <th scope="col">Course</th>
                <th scope="col">Department</th>
                <th scope="col">Marks</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, index) => (
                <tr key={mark._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{mark.student.name}</td>
                  <td>{mark.student.roll_number}</td>
                  <td>{mark.exam.exam_name}</td>
                  <td>{mark.exam.course.name}</td>
                  <td>{mark.exam.department.dept_name}</td>
                  <td>{mark.mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Marks;
