import Title from "../forms/Title/Title";
const SubjectData = (props) => {
  const courseData = props.courseData;
  console.log(courseData);
  return (
    <div className="subject-details">
      <Title title="subject details" />
      <div className="category">
        <p>Name</p>
        <p>{courseData.name}</p>
      </div>
      <div className="category">
        <p>Subject Code </p>
        <p>{courseData.subject_code}</p>
      </div>
      <div className="category">
        <p>Credits</p>
        <p>{courseData.credits}</p>
      </div>
      <div className="category">
        <p>Department</p>
        <p>{courseData.department.name}</p>
      </div>
    </div>
  );
};

export default SubjectData;
