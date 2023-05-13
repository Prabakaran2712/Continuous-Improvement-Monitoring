import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Button from "../../../components/forms/Button/Button";
import Title from "../../../components/forms/Title/Title";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CreateButton from "../../../components/Button/CreateButton/CreateButton";
import Table from "../../../components/Table/Table";
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
      <div className="header d-flex flex-row justify-content-between my-lg-3 mt-sm-1 mx-lg-5">
        <div className="title">
          <Title title="Your Classes" />
        </div>
        <div className="options d-flex flex-row justify-content-end m-lg-2">
          <CreateButton
            onClick={() => {
              console.log("clicked");
              navigate("/teacher/class/create");
            }}
          />
        </div>
      </div>
      <div className="body m-2">
        <div className="row   table-responsive px-5 text-center">
          <Table
            thead={["#", "Course Name", "Topic", "Date", "Time"]}
            tbody={data.map((classData, index) => {
              return [
                classData.teaches.course.name,
                classData.topic,
                moment(classData.date).format("DD-MM-YYYY"),
                classData.time,
                () => {
                  navigate(`/teacher/class/${classData._id}`);
                },
              ];
            })}
          />
        </div>
      </div>
    </Container>
  );
};

export default Class;
