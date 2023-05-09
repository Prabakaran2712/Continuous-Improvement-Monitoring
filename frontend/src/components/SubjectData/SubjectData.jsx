import Title from "../forms/Title/Title";
import Style from "./SubjectData.module.css";
const SubjectData = (props) => {
  const courseData = props.courseData;
  console.log(courseData);
  const options = [
    {
      name: "Name",
      value: courseData.name,
    },
    {
      name: "Subject Code",
      value: courseData.subject_code,
    },
    {
      name: "Credits",
      value: courseData.credits,
    },
    {
      name: "Department",
      value: courseData.department.dept_name,
    },
  ];
  return (
    <div className="subjectDetails m-3 mb-5">
      <div className="mb-4 ">
        <Title title="Subject details" />
      </div>
      <div className="row mx-5">
        <div className="col-6">
          {options.map((option, indx) => {
            if (indx < options.length / 2)
              return (
                <div className={`${Style.category}`} key={Math.random()}>
                  <p>
                    {option.name} : <span>{option.value}</span>
                  </p>
                </div>
              );
          })}
        </div>
        <div className="col-6">
          {options.map((option, indx) => {
            if (indx >= options.length / 2)
              return (
                <div className={`${Style.category}`} key={Math.random()}>
                  <p>
                    {option.name} : <span>{option.value}</span>
                  </p>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubjectData;
