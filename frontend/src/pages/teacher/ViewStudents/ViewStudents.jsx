import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import Button from "../../../components/forms/Button/Button";
import Select from "../../../components/Select/Select";
const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [batchValues, setBatchValues] = useState([]);
  const [filterdStudents, setFilterdStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    var studentarray = [];
    axios
      .get(`/api/students`)
      .then((res) => {
        setStudents(res.data);
        studentarray = res.data;
        axios
          .get(`/api/batches`)
          .then((res) => {
            //start year - end year
            const batchList = res.data.map(
              (x) => `${x.start_year} - ${x.end_year}`
            );
            setBatchList(batchList);

            //batch id
            const batchValues = res.data.map((x) => x._id);
            setBatchValues(batchValues);
            const filterdStudents = studentarray.filter(
              (x) => x.batch._id === res.data[0]._id
            );

            setFilterdStudents(filterdStudents);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <div className="header">
        <Title title="Students" />
        <div className="option-pane">
          <Select
            options={batchList}
            values={batchValues}
            onChange={(e) => {
              const batchId = e.target.value;
              if (batchId === "all") {
                setFilterdStudents(students);
              } else {
                const filterdStudents = students.filter(
                  (x) => x.batch._id === batchId
                );

                setFilterdStudents(filterdStudents);
              }
            }}
          />
        </div>
      </div>
      <div className="body w-75 my-5 mx-auto">
        <table className="table table-striped">
          <thead
            className="
          table-dark
          "
          >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Roll Number</th>
            </tr>
          </thead>
          <tbody>
            {filterdStudents.map((x, i) => {
              return (
                <tr
                  key={Math.random()}
                  onClick={() => {
                    navigate(`/teacher/student/${x._id}`);
                  }}
                >
                  <th scope="row">{i + 1}</th>
                  <td>{x.name}</td>
                  <td>{x.roll_number}</td>
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
