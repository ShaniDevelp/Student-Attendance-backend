const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')


router.post('/signup', studentController.create_student);
router.post('/login', studentController.find_student);
router.post('/logout', studentController.logout_student);
router.post('/attendance', studentController.student_attendance);
router.get('/allattendance/:id', studentController.attendance_data);
router.get('/allleaves/:id', studentController.leaves_data)
router.post('/leave', studentController.leave_request)
router.get('/userdetail/:id', studentController.user_detail)

router.patch('/update/:id', studentController.profile_update)


module.exports = router;