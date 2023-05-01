const Grade = require("../models/Grades");

// add or update more marks
const addMoreGrades = async (req, res) => {
  try {
    const grades = req.body;
    grades.forEach(async (grade) => {
      const md = await Grade.find({
        teaches: grade.teaches,
        student: grade.student,
      });

      if (md.length > 0) {
        await Grade.updateOne(
          { teaches: grade.teaches, student: grade.student },
          { $set: { grade: grade.grade, published: grade.published } }
        );
      } else {
        const m = new Grade(mark);
        await m.save();
      }
    });

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGradeByTeaches = async (req, res) => {
  try {
    const grade = await Grade.find({})
      .populate({
        path: "student",
        populate: { path: "department batch" },
      })
      .populate({
        path: "teaches",
        populate: { path: "course", populate: { path: "department" } },
      })
      .populate({
        path: "teaches",
        populate: { path: "teacher", populate: "address department" },
      })
      .populate({
        path: "teaches",
        populate: { path: "students", populate: { path: "department batch" } },
      });

    //filter exams with teaches _id equals to req.params.id
    const filteredGrades = grade.filter((m) => {
      return m.teaches._id == req.params.id;
    });

    res.status(200).json(filteredGrades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get grade by student

const getGradeByStudent = async (req, res) => {
  try {
    const grade = await Grade.find({})
      .populate({
        path: "student",
        populate: { path: "department batch" },
      })
      .populate({
        path: "teaches",
        populate: { path: "course", populate: { path: "department" } },
      })
      .populate({
        path: "teaches",
        populate: { path: "teacher", populate: "address department" },
      })
      .populate({
        path: "teaches",
        populate: { path: "students", populate: { path: "department batch" } },
      });
    //filter grades with student _id equals to req.params.id
    const filteredGrades = grade.filter((m) => {
      return m.student._id == req.params.id;
    });

    res.status(200).json(filteredGrades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMoreGrades,
  getGradeByTeaches,
  getGradeByStudent,
};
