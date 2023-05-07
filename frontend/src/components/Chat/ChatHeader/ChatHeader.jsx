import Style from "./ChatHeader.module.css";
const ChatHeader = (props) => {
  const data = props.data;

  const options = [
    {
      name: "Title",
      value: data.title,
    },
    {
      name: "Subject Name",
      value: data.teaches.course.name,
    },
    {
      name: "Subject Code",
      value: data.teaches.course.subject_code,
    },
    {
      name: "Department",
      value: data.teaches.course.department.dept_name,
    },
  ];
  if (props.role == "student") {
    options.push({
      name: "Teacher",
      value: data.teaches.teacher.name,
    });
  } else {
    options.push({
      name: "Student",
      value: data.student.name,
    });
  }

  return (
    <div className="subjectDetails  m-md-3 mb-5">
      <div className="row mx-md-5">
        <div className=" col-12 col-md-6">
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
        <div className="col-12 col-md-6">
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

export default ChatHeader;
