const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Define API routes
router.post('/mentors', apiController.createMentor);
router.post('/students', apiController.createStudent);
router.post('/mentors/:mentorId/assign-students', apiController.assignStudentsToMentor);
router.put('/students/:studentId/assign-mentor', apiController.assignOrChangeMentorForStudent);
router.get('/mentors/:mentorId/students', apiController.listStudentsForMentor);
router.get('/students/:studentId/mentor-history', apiController.showMentorHistoryForStudent);

module.exports = router;
