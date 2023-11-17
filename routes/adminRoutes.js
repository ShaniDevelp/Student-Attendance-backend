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
router.get('/attendance/:id/delete', adminController.delete_attendance);
router.get('/attendance/:id/report', adminController.generate_report);
router.put('/attendance/:id/update', adminController.update_attendance);


module.exports = router;