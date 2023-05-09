import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Button from "../../../components/forms/Button/Button";
import Title from "../../../components/forms/Title/Title";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CreateExamButton from "../../../components/Exam/CreateExamButton/CreateExamButton";
import Loading from "../../../components/Loading/Loading";

const Class = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState();

  const user = auth.user._id;

  useEffect(() => {
    axios
      .get(`/api/classes/teacher/${user}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="header my-5">
        <Title title="Class" />
        <div className="option-pane d-flex flex-row justify-content-end">
          <CreateExamButton
            name="Create"
            type="success"
            onClick={() => {
              navigate("/teacher/class/create");
            }}
          />
        </div>
      </div>
      <div className="body m-2">
        <div className="row   table-responsive px-5">
          <table
            className="table table-striped table-hover  mx-auto"
            style={{ cursor: "pointer" }}
          >
            <thead className="table-dark">
              <tr>
                <th> #</th>
                <th>Course Name</th>
                <th>Topic</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((classData, index) => {
                  return (
                    <tr
                      key={Math.random()}
                      onClick={() => {
                        navigate(`/teacher/class/${classData._id}`);
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{classData.teaches.course.name}</td>
                      <td>{classData.topic}</td>
                      <td>
                        {
                          //convert to date string
                          moment(classData.date).format("DD-MM-YYYY")
                        }
                      </td>
                      <td>{classData.time}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Class;
