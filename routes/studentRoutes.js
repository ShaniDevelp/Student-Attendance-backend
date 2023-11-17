const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')


router.post('/signup', studentController.create_student);
router.post('/login', studentController.find_student);
router.post('/logout', studentController.logout_student);
router.post('/attendance', studentController.student_attendance);
router.post('/leave', studentController.leave_request)


module.exports = router;