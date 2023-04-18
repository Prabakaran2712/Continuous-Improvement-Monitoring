import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Button from "../../../components/forms/Button/Button";
import Title from "../../../components/forms/Title/Title";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Class = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const user = "643cd9f6a0dc99c9f907a437";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/classes/teacher/${user}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <div className="header">
        <Title title="Class" />
        <div className="option-pane d-flex flex-row justify-content-end">
          <Button
            name="Create"
            type="success"
            onClick={() => {
              navigate("/teacher/class/create");
            }}
          />
        </div>
      </div>
      <div className="body m-2">
        <div className="row   table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Topic</th>
                <th>Date</th>
                <th>Time</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((classData) => {
                  return (
                    <tr key={Math.random()}>
                      <td>{classData.teaches.course.name}</td>
                      <td>{classData.topic}</td>
                      <td>{classData.date}</td>
                      <td>{classData.time}</td>
                      <td>
                        <Button
                          type="success"
                          onClick={() => {
                            navigate(`/teacher/class/${classData._id}`);
                          }}
                          name="View"
                        />
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
};

export default Class;
