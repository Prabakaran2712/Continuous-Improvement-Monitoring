import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Table from "../../../../components/Table/Table";
import Styles from "./ViewExam.module.css";
import Loading from "../../../../components/Loading/Loading";
import CreateButton from "../../../../components/Button/CreateButton/CreateButton";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Select from "../../../../components/Select/Select";

const ViewExam = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [examData, setExamData] = useState([]);

  const auth = useAuthContext();
  const user = auth.user._id;
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(-1);
  const [examfilter, setExamFilter] = useState("All");
  const [batchfilter, setBatchFilter] = useState("All");
  const [batches, setBatches] = useState([]);

  const filter = (type, batch) => {
    //common filter function for both filters
    if (type === "All" && batch === "All") {
      setData(examData);
    } else if (type === "All") {
      var temp = examData.filter((exam) => {
        if (exam[4] === batch) {
          return true;
        }
      });

      setData(temp);
    } else if (batch == "All") {
      var temp = examData.filter((exam) => {
        if (exam[3] === type) {
          return true;
        }
      });

      setData(temp);
    } else {
      var temp = examData.filter((exam) => {
        if (exam[3] === type && exam[4] == batch) {
          return true;
        }
      });

      setData(temp);
    }
  };

  const sort = (indx) => {
    indx = indx - 1;
    setClickCount(clickCount + 1);

    //sort  the data by ascending order
    var sorted = [];
    if (clickCount % 2 == 0) {
      if (indx != 4) {
        sorted = [...Data].sort((a, b) => {
          console.log(indx, a[indx]);
          if (a[indx] < b[indx]) {
            return -1;
          }
          if (a[indx] > b[indx]) {
            return 1;
          }
          return 0;
        });
      } else {
        sorted = [...Data].sort((a, b) => {
          console.log(indx, a[indx]);
          const abatch = a[indx].split("-");
          const bbatch = b[indx].split("-");
          const astartyear = parseInt(abatch[0]);
          const bstartyear = parseInt(bbatch[0]);
          if (astartyear < bstartyear) {
            return -1;
          }
          if (astartyear > bstartyear) {
            return 1;
          }
          return 0;
        });
      }
    } //sort the data by descending order if already sorted in ascending order
    else {
      if (indx != 4) {
        sorted = [...Data].sort((a, b) => {
          if (a[indx] > b[indx]) {
            return -1;
          }
          if (a[indx] < b[indx]) {
            return 1;
          }
          return 0;
        });
      } else {
        sorted = [...Data].sort((a, b) => {
          const abatch = a[indx].split("-");
          const bbatch = b[indx].split("-");
          const astartyear = parseInt(abatch[0]);
          const bstartyear = parseInt(bbatch[0]);
          if (astartyear < bstartyear) {
            return 1;
          }
          if (astartyear > bstartyear) {
            return -1;
          }
          return 0;
        });
      }
    }
    console.log(sorted);
    setData(sorted);
  };

  const setDataValue = (data) => {
    var temp = [];

    data.map((exam) => {
      temp.push([
        exam.exam_code,

        exam.teaches.course.name,
        exam.teaches.course.subject_code,
        exam.exam_type,
        exam.teaches.batch.start_year + "-" + exam.teaches.batch.end_year,
        <FontAwesomeIcon icon={faArrowRight} />,
        () => {
          navigate(`/teacher/exams/${exam._id}`);
        },
      ]);
    });
    setExamData(temp);
    setData(temp);
  };

  useEffect(() => {
    axios
      .get(`/api/exams/teacher/${user}`)
      .then((res) => {
        var temp = [];

        setDataValue(res.data);

        res.data.map((exam) => {
          temp.push(
            exam.teaches.batch.start_year + "-" + exam.teaches.batch.end_year
          );
        });
        setBatches([...new Set(temp)]);

        console.log(temp);
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
        <div className="header d-flex flex-row justify-content-between my-lg-3 mt-sm-1">
          <div className="title">
            <Title title="Exams" />
          </div>
          <div className="options d-flex flex-row justify-content-end m-lg-2">
            <CreateButton
              onClick={() => {
                console.log("clicked");
                navigate("/teacher/exams/create");
              }}
            />
          </div>
        </div>
        <div className={`${Styles.body}`}>
          <div className={`${Styles.table}`}>
            <Table
              thead={[
                "# ",
                `Exam Code `,
                "Subject Name",
                "Subject Code",
                "Type",
                "Batch",
                "",
              ]}
              tbody={Data}
              sort={sort}
              type="sort"
              tooltip={true}
            />
          </div>
          <div className={`${Styles.optionPane}`}>
            <div className={`${Styles.examOption}`}>
              <Select
                label="Exam"
                options={[
                  "All",
                  "Assessment-1",
                  "Assessment-2",
                  "End Semester",
                ]}
                values={["All", "Assessment-1", "Assessment-2", "End-Semester"]}
                onChange={(e) => {
                  setExamFilter(e.target.value);
                  filter(e.target.value, batchfilter);
                }}
              />
            </div>
            <div className={`${Styles.batchOption}`}>
              <Select
                label="Batch"
                options={["All", ...batches]}
                values={["All", ...batches]}
                onChange={(e) => {
                  setBatchFilter(e.target.value);
                  filter(examfilter, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
};

export default ViewExam;
