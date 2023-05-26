import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import Button from "../../../components/forms/Button/Button";
import Select from "../../../components/Select/Select";
import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";
import TabPanel from "../../../components/TabPanel/TabPanel";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Styles from "./ViewStudents.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { set } from "mongoose";
const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [batchValues, setBatchValues] = useState([]);
  const [filterdStudents, setFilterdStudents] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const setDataValue = (data) => {
    var temp = [];

    data.map((student) => {
      temp.push([
        student.name,
        student.roll_number,
        <FontAwesomeIcon icon={faArrowRight} />,
        () => {
          navigate(`/teacher/student/${student._id}`);
        },
      ]);
    });

    setData(temp);
  };

  useEffect(() => {
    var studentarray = [];
    axios
      .get(`/api/students`)
      .then((res) => {
        //sort data based on roll number
        res.data.sort((a, b) => {
          return a.roll_number - b.roll_number;
        });

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
            console.log(studentarray);
            const filterdStudents = studentarray.filter(
              (x) => x.batch._id === res.data[0]._id
            );
            setFilterdStudents(filterdStudents);
            setDataValue(filterdStudents);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-1">
      <div className="header  my-3">
        <div className="title my-3 mb-4">
          <Title title="Students" />
        </div>
        <div className="">
          <Select
            options={batchList}
            values={batchValues}
            label="Batch"
            onChange={(e) => {
              const batchId = e.target.value;
              if (batchId === "all") {
                setFilterdStudents(students);
                setDataValue(students);
              } else {
                const filterdStudents = students.filter(
                  (x) => x.batch._id === batchId
                );
                setDataValue(filterdStudents);

                setFilterdStudents(filterdStudents);
              }
            }}
          />
        </div>
      </div>
      <div className="">
        <Table thead={["#", "Name", "Roll Number", ""]} tbody={data} />
      </div>
    </div>
  );
};

export default ViewStudents;
