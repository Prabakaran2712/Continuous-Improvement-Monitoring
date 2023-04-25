import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import Button from "../../../components/forms/Button/Button";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [batchList, setBatchList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/students`)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:3000/api/batches`)
      .then((res) => {
        console.log(res.data);
        setBatchList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <div className="header">
        <Title title="Students" />
        <div className="option-pane"></div>
      </div>
      <div className="body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Roll Number</th>
              <th scope="col">view</th>
            </tr>
          </thead>
          <tbody>
            {students.map((x, i) => {
              return (
                <tr key={Math.random()}>
                  <th scope="row">{i + 1}</th>
                  <td>{x.name}</td>
                  <td>{x.roll_number}</td>

                  <td>
                    <Button
                      type="success"
                      onClick={() => {
                        navigate(`/teacher/student/${x._id}`);
                      }}
                      name="view"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ViewStudents;
