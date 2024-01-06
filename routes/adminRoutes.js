const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')


router.post('/signup', adminController.create_admin);
router.post('/login', adminController.find_admin);
router.post('/logout', adminController.logout_admin);
router.post('/attendance', adminController.mark_student_attendance);
router.get('/countall', adminController.all_data_counts);
router.get('/count/:id', adminController.student_data_counts);
router.put('/leaveapprove/:id', adminController.leave_approve);
router.put('/leaverejected/:id', adminController.leave_reject);
router.delete('/attendance/:id/delete', adminController.delete_attendance);
router.get('/attendance/:id/report', adminController.generate_report);
router.put('/attendance/:id/update', adminController.update_attendance);
router.get('/admindetail/:id', adminController.admin_detail);
router.get('/todayAttendance/:id', adminController.student_attendance_tody);
router.get('/todayLeave/:id', adminController.student_leave_tody);

// farhan add changes in the code
router.get('/allusers', adminController.getAllUsers);
router.get('/todayleaves', adminController.getTodayLeaveRequests);

// 


module.exports = router;