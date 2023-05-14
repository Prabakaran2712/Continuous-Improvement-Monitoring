import Title from "../forms/Title/Title";
import Styles from "./SubjectData.module.css";
const SubjectData = (props) => {
  const courseData = props.courseData;
  console.log(courseData);
  const options = [
    {
      name: "Name",
      value: courseData.course.name,
    },
    {
      name: "Subject Code",
      value: courseData.course.subject_code,
    },
    {
      name: "Credits",
      value: courseData.course.credits,
    },
    {
      name: "Department",
      value: courseData.course.department.dept_name,
    },
    {
      name: "Semester",
      value: courseData.semester,
    },
    {
      name: "Batch",
      value: courseData.batch.start_year + "-" + courseData.batch.end_year,
    },
  ];
  return (
    <div className={`${Styles.subjectDetails}`}>
      <div className="row mx-sm-auto mx-md-5">
        <div className="col-lg-6 col-md-12">
          {options.map((option, indx) => {
            if (indx < options.length / 2)
              return (
                <div className={`${Styles.category}`} key={Math.random()}>
                  <p>
                    {option.name} : <span>{option.value}</span>
                  </p>
                </div>
              );
          })}
        </div>
        <div className="col-lg-6 col-md-12">
          {options.map((option, indx) => {
            if (indx >= options.length / 2)
              return (
                <div className={`${Styles.category}`} key={Math.random()}>
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
