import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SubjectMarkAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //get value from url
  const { id, sid } = useParams();
  useEffect(() => {
    //get course details with id
  }, []);
  return (
    <div>
      {id}
      {sid}
    </div>
  );
};

export default SubjectMarkAnalytics;
