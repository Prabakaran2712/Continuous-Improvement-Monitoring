import axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const ViewStudentMarks = () => {
  const auth = useAuthContext();
  useEffect(() => {
    //get all marks
    axios
      .get("/api/marks")
      .then((res) => {
        const allmarks = res.data;
        axios.get(`/api/teaches/student/${auth.user._id}`).then((res) => {
          const data = [];
          res.data.map((teaches) => {
            console.log(teaches);
            const elem = allmarks.map((mark) => {
              if (mark.exam.teaches._id === teaches._id) {
                return mark;
              } else {
                return null;
              }
            });
            //removing null values
            const filtered = elem.filter(function (el) {
              return el != null;
            });
            data.push(filtered);
          });
          console.log("data");
          console.log(data);
        });
        console.log("marks data");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>View Student Marks</h1>
    </div>
  );
};
export default ViewStudentMarks;
