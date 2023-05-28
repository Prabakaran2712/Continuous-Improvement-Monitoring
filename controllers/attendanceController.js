const Attendance = require("../models/Attendance");
const Teaches = require("../models/Teaches");

//get all attendances
const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find({})
      .populate("student")
      .populate("class");
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new attendance
const addNewAttendance = async (req, res) => {
  const attendance = new Attendance(req.body);
  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//add or update more attendances
const addMoreAttendances = async (req, res) => {
  try {
    const attendances = req.body;

    attendances.forEach(async (item) => {
      const ad = await Attendance.findOne({
        student: item.student,
        class: item.class,
      });
      if (ad) {
        await Attendance.updateOne(
          { student: item.student, class: item.class },
          { $set: { present: item.present } }
        );
      } else {
        const attendance = new Attendance(item);
        await attendance.save();
      }
    });

    res.status(201).json(attendances);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete attendance
const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update attendance
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (attendance) {
      attendance.student = req.body.student;
      attendance.present = req.body.present;
      attendance.class = req.body.class;
      const updatedAttendance = await attendance.save();
      res.status(200).json(updatedAttendance);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//attendance by student
const getAttendanceByStudent = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.id })
      .populate({ path: "student", populate: "department batch" })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "course", populate: { path: "department" } },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "teacher", populate: "address department" },
          match: { _id: req.params.id },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: {
            path: "students",
            populate: { path: "department batch" },
          },
        },
      })
      .populate({
        path: "class",
        populate: { path: "teaches", populate: { path: "batch" } },
      });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//attendance by class
const getAttendanceByClass = async (req, res) => {
  try {
    const attendance = await Attendance.find({ class: req.params.id })
      .populate({ path: "student", populate: "department batch" })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "course", populate: { path: "department" } },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "teacher", populate: "address department" },
          match: { _id: req.params.id },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: {
            path: "students",
            populate: { path: "department batch" },
          },
        },
      })
      .populate({
        path: "class",
        populate: { path: "teaches", populate: { path: "batch" } },
      });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//attendance percentage by student for course
const getAttendancePercentageByStudentForCourse = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.params.student_id,
      course: req.params.course_id,
    })
      .populate("student")
      .populate("class");
    const total_classes = attendance.length;
    const present_classes = attendance.filter(
      (item) => item.present === true
    ).length;
    const percentage = (present_classes / total_classes) * 100;
    res.status(200).json({ percentage: percentage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//total attendance percentage by student for all classes
const getAttendancePercentageByStudentForAllClasses = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.student_id })
      .populate("student")
      .populate("class");
    const total_classes = attendance.length;
    const present_classes = attendance.filter(
      (item) => item.present === true
    ).length;
    const percentage = (present_classes / total_classes) * 100;
    res.status(200).json({ percentage: percentage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//total attendance percentage by class for all students
const getAttendancePercentageByClassForAllStudents = async (req, res) => {
  try {
    const attendance = await Attendance.find({ class: req.params.class_id })
      .populate("student")
      .populate("class");
    const total_classes = attendance.length;
    const present_classes = attendance.filter(
      (item) => item.present === true
    ).length;
    const percentage = (present_classes / total_classes) * 100;
    res.status(200).json({ percentage: percentage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get attendace precentage by student for all courses
const getAttendancePercentageByStudentForAllCourses = async (req, res) => {
  try {
    console.log(req.params.student_id);
    const attendance = await Attendance.find({ student: req.params.student_id })
      .populate({ path: "student", populate: "department batch" })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "course", populate: { path: "department" } },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "teacher", populate: "address department" },
          match: { _id: req.params.id },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: {
            path: "students",
            populate: { path: "department batch" },
          },
        },
      })
      .populate({
        path: "class",
        populate: { path: "teaches", populate: { path: "batch" } },
      });
    //get number of unique courses
    const courses = attendance.map((item) => {
      //add semester to each course

      item.class.teaches.course.semester = item.class.teaches.semester;
      return item.class.teaches.course;
    });
    //remove duplicates
    const unique_courses = [...new Set(courses)];

    //get attendance % for each course
    var attendance_percentage = [];
    unique_courses.map((course) => {
      const course_attendance = attendance.filter(
        (item) => item.class.teaches.course === course
      );

      var total_hours = 0;
      var present_hours = 0;
      course_attendance.map((item) => {
        total_hours += parseInt(item.class.duration);
        if (item.present === true) {
          present_hours += parseInt(item.class.duration);
        }
      });

      var percentage = (present_hours / total_hours) * 100;
      attendance_percentage.push({
        course: course,
        percentage: percentage,
        semester: course.semester,
        teaches: course_attendance[0].class.teaches,
      });
    });
    res.status(200).json(attendance_percentage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get attendaces of student for a teaches
const getAttendanceByStudentAndTeaches = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.params.student_id,
    })
      .populate({ path: "student", populate: "department batch" })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "course", populate: { path: "department" } },
          match: { _id: req.params.teaches_id },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "teacher", populate: "address department" },
          match: { _id: req.params.teaches_id },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: {
            path: "students",
            populate: { path: "department batch" },
          },
          match: { _id: req.params.teaches_id },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "batch" },
          match: { _id: req.params.teaches_id },
        },
      });

    // remove null values
    const filtered_attendance = attendance.filter(
      (item) => item.class.teaches !== null
    );

    res.status(200).json(filtered_attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get attendace percentage of all students for a teaches
const getAttendancePercentageByTeaches = async (req, res) => {
  try {
    const attendance = await Attendance.find({})
      .populate({ path: "student", populate: "department batch" })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "course", populate: { path: "department" } },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: { path: "teacher", populate: "address department" },
        },
      })
      .populate({
        path: "class",
        populate: {
          path: "teaches",
          populate: {
            path: "students",
            populate: { path: "department batch" },
          },
        },
      })
      .populate({
        path: "class",
        populate: { path: "teaches", populate: { path: "batch" } },
      });

    const filtered_attendance = attendance.filter((item) => {
      return item.class.teaches._id == req.params.id;
    });

    //find students for teaches
    const students = filtered_attendance.map((item) => item.student);
    //remove duplicates
    const unique_students = [...new Set(students)];
    //get attendance percentage for each student

    var attendance_percentage = [];
    unique_students.map((student) => {
      var totalclasshrs = 0;
      var totalpresenthrs = 0;

      var student_attendance = filtered_attendance.filter(
        (item) => item.student._id == student._id
      );

      student_attendance.map((item) => {
        //convert to integer
        totalclasshrs += parseInt(item.class.duration);
        if (item.present === true) {
          totalpresenthrs += parseInt(item.class.duration);
        }
      });

      const percentage = (totalpresenthrs / totalclasshrs) * 100;
      attendance_percentage.push({
        student: student,
        percentage: percentage,
      });
    });
    res.status(200).json(attendance_percentage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAttendances,
  addNewAttendance,
  addMoreAttendances,
  deleteAttendance,
  updateAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  getAttendancePercentageByStudentForCourse,
  getAttendancePercentageByStudentForAllClasses,
  getAttendancePercentageByClassForAllStudents,
  getAttendancePercentageByStudentForAllCourses,
  getAttendanceByStudentAndTeaches,
  getAttendancePercentageByTeaches,
};
