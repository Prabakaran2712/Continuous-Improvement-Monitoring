import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Button from "../../../../components/forms/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../../../components/Loading/Loading";
import CreateExamButton from "../../../../components/Exam/CreateExamButton/CreateExamButton";
import ViewExamButton from "../../../../components/Exam/ViewExamButton/ViewExamButton";
import { useAuthContext } from "../../../../hooks/useAuthContext";
const ViewExam = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState();
  const auth = useAuthContext();

  const user = auth.user._id;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/exams/teacher/${user}`)
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
    return (
      <Container>
        <Loading />
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="header d-flex flex-row justify-content-between my-5">
          <div className="title">
            <Title title="Exams" />
          </div>
          <div className="options d-flex flex-row justify-content-end m-2">
            <CreateExamButton
              onClick={() => {
                console.log("clicked");
                navigate("/teacher/createExam");
              }}
            />
          </div>
        </div>
        <div className="body m-2 my-5">
          <div className="row   table-responsive px-5">
            <table
              className="table table-striped mx-auto table-hover"
              style={{
                cursor: "pointer",
              }}
            >
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Exam Code</th>

                  <th>Subject Name</th>
                  <th>Subject Code</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((exam, indx) => {
                  return (
                    <tr
                      key={Math.random()}
                      onClick={() => {
                        navigate(`/teacher/exam/${exam._id}`);
                      }}
                    >
                      <td>{indx + 1}</td>
                      <td>{exam.exam_code}</td>
                      <td>{exam.teaches.course.name}</td>
                      <td>{exam.teaches.course.subject_code}</td>
                      <td>{exam.exam_type}</td>
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
