const Mentor = require('../models/mentor');
const Student = require('../models/student');

// Create Mentor
exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (error) {
    res.status(400).send({ error: 'Failed to create mentor' });
  }
};

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send({ error: 'Failed to create student' });
  }
};

// Assign Students to Mentor
exports.assignStudentsToMentor = async (req, res) => {
  const { mentorId } = req.params;
  const { studentIds } = req.body;

  try {
    const updatedStudents = await Student.updateMany(
      { _id: { $in: studentIds }, mentorId: { $exists: false } },
      { mentorId: mentorId },
      { new: true }
    );

    res.status(200).send(updatedStudents);
  } catch (error) {
    res.status(400).send({ error: 'Failed to assign students to mentor' });
  }
};

// Assign or Change Mentor for a Student
exports.assignOrChangeMentorForStudent = async (req, res) => {
  const { studentId } = req.params;
  const { mentorId } = req.body;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    if (student.mentorId) {
      student.mentorHistory.push(student.mentorId);
    }

    student.mentorId = mentorId;
    await student.save();

    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({ error: 'Failed to assign/change mentor' });
  }
};

// List All Students for a Particular Mentor
exports.listStudentsForMentor = async (req, res) => {
  const { mentorId } = req.params;

  try {
    const students = await Student.find({ mentorId: mentorId });
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send({ error: 'Failed to fetch students for mentor' });
  }
};

// Show Previously Assigned Mentors for a Student
exports.showMentorHistoryForStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId).populate('mentorHistory', 'name email');
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    res.status(200).send(student.mentorHistory);
  } catch (error) {
    res.status(400).send({ error: 'Failed to fetch mentor history for student' });
  }
};
