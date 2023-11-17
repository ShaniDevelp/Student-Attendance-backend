const Student = require('../models/studentSchema.js');
const Attandance = require('../models/attendanceSchema.js');
const Leave = require('../models/leaveSchema.js');
const asynchandler = require("express-async-handler");
const bcrypt = require('bcryptjs');


exports.create_student = asynchandler(async(req, res, next)=>{

    try {
        const student = new Student(req.body)
        await student.save()
        const token = await student.generateAuthToken();
        res.status(200).send({student, token});

    } catch (error){    
        res.status(401).send(error)

    }
});

exports.find_student = asynchandler(async(req, res, next)=> {

    try{
        const student = await findByCredentials(req.body.email, req.body.password);
        const token = await student.generateAuthToken();
        res.status(200).send({student, token});

    } catch(error){
        res.status(401).send(error)
    }
});

const findByCredentials = async (email, password)=> {

    const student = await Student.findOne({email});
    if(!student){
        throw new Error('Wrong email')
    }
    const isMatched = await bcrypt.compare(password, student.password);
    if(!isMatched){
        throw new Error('wrong password')
    }
    return student
};


exports.student_attendance = asynchandler(async(req, res, next)=> {

    console.log(req.body)
    const studentId = req.body.student
   
    try{
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingAttendance  = await Attandance.findOne({student : studentId, date: { $gte: today }});
        if(existingAttendance){
            return res.status(400).send('attendance has been marked for today.')
        }
        const attendance = new Attandance(req.body);
        await attendance.save()
        res.status(201).send(attendance)

    } catch(error){
        res.status(401).send(error)
    }
});

exports.leave_request = asynchandler(async(req, res, next)=> {

    console.log(req.body)
   
    try{
        const leave = new Leave(req.body);
        await leave.save()
        res.status(201).send(leave)

    } catch(error){
        res.status(401).send(error)
    }

});
























exports.logout_student = asynchandler(async(req, res, next)=> {
    try {
        req.user.tokens =  req.user.tokens.filter((token) => {
       return token.token !== req.token
      })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
});

exports.logout_All = asynchandler(async(req, res, next)=> {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {  
        res.status(500).send()
    }
})