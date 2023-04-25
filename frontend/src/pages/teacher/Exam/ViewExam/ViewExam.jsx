import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Button from "../../../../components/forms/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ViewExam = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState();
  const user = "64212913263de2cbfa095205";

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/exams/teacher/${user}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Container>
        <div className="header">
          <Title title="Exams" />
          <div className="options d-flex flex-row justify-content-end m-2">
            <Button
              type="success"
              onClick={() => {
                console.log("clicked");
                navigate("/teacher/createExam");
              }}
              name="Create Exam"
            />
          </div>
        </div>
        <div className="body m-2">
          <div className="row   table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Exam Code</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Subject Name</th>
                  <th>Subject Code</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((exam) => {
                  return (
                    <tr key={Math.random()}>
                      <td>{exam.exam_code}</td>
                      <td>{exam.exam_date}</td>
                      <td>{exam.exam_time}</td>
                      <td>{exam.exam_duration}</td>
                      <td>{exam.teaches.course.name}</td>
                      <td>{exam.teaches.course.subject_code}</td>
                      <td>{exam.exam_type}</td>
                      <td>
                        <Button
                          name="View"
                          onClick={() => {
                            navigate(`/teacher/exam/${exam._id}`);
                          }}
                          type="success"
                        />
                      </td>
                      <td>
                        <Button name="Delete" type="danger" />
                      </td>
                      <td>
                        <Button name="Update" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    );
  }
};

export default ViewExam;
