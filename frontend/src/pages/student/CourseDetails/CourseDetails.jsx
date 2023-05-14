import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubjectData from "../../../components/SubjectData/SubjectData";
import Loading from "../../../components/Loading/Loading";
const CourseDetails = () => {
  const { id } = useParams();
  const [subjectData, setSubjectData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //get subject details from teaches
    axios
      .get(`/api/teaches/${id}`)
      .then((res) => {
        console.log(res.data);
        setSubjectData(res.data);
        setLoading(false);
      })
      .then((err) => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {console.log(subjectData)}
      <SubjectData courseData={subjectData} />
      <div className="options ">
        <div className="row ">
          <div className="col-6 text-center">
            <button className="btn btn-primary">View Attendance</button>
          </div>
          <div className="col-6 text-center">
            <button className="btn btn-primary">View Marks</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
