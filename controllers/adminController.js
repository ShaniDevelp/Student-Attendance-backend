const Admin = require('../models/adminSchema');
const Attandance = require('../models/attendanceSchema.js');
const Leave = require('../models/leaveSchema.js');
const asynchandler = require("express-async-handler");
const bcrypt = require('bcryptjs');



exports.create_admin = asynchandler(async(req, res, next)=>{

    try {
        const admin = new Admin(req.body)
        await admin.save()
        const token = await admin.generateAuthToken();
        res.status(200).send({student: admin, token});

    } catch (error){    
        res.status(401).send(error)

    }
});

exports.find_admin = asynchandler(async(req, res, next)=> {

    try{
        const admin = await findByCredentials(req.body.email, req.body.password);
        const token = await admin.generateAuthToken();
        res.status(200).send({student: admin, token});

    } catch(error){
        res.status(401).send(error)
    }
});

const findByCredentials = async (email, password)=> {

    const admin = await Admin.findOne({email});
    if(!admin){
        throw new Error('Wrong email')
    }
    const isMatched = await bcrypt.compare(password, admin.password);
    if(!isMatched){
        throw new Error('wrong password')
    }
    return admin
};

exports.logout_admin = asynchandler(async(req, res, next)=> {
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

exports.leave_approve = asynchandler(async(req, res, next)=> {

    const studentId = req.params.id

     try{      
        const leave = await Leave.findOneAndUpdate({student : studentId}, {isApproved : true}, { new: true });  
        if(!leave){
            res.status(401).send("leave not found");
        }
        await leave.save();
        res.status(200).send(leave)

    } catch (error){
        res.status(400).send(error)
    }
});


exports.mark_student_attendance = asynchandler(async(req, res, next)=> {

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


exports.update_attendance = asynchandler(async(req, res, next)=> {

    const studentId = req.params.id

    try {
        const attendance = await Attandance.findOneAndUpdate({student : studentId}, {status : req.body.status}, {new : true});
        if(!attendance){
            return res.status(401).send('Not Found')
        }
        await attendance.save();
        res.status(200).send(attendance);

    } catch(error) {
        res.status(500).send(error)
    }

});


exports.delete_attendance = asynchandler(async(req, res, next)=> {
    const attendanceId = req.params.id
    try{
        const attendance = await Attandance.findByIdAndDelete(attendanceId);
        if(!attendance){
            res.status(400).send('record not found')
        }
        res.status(201).send(attendance);

    } catch(error){
        res.status(400).send(error)
    }
});

exports.generate_report = asynchandler(async(req, res, next)=> {
    const studentId = req.params.id
    const startDate = req.body.start_date
    const endDate = req.body.end_date

    try{

        const dateStart = new Date(startDate);
        const dateEnd = new Date(endDate)

        const attandanceList = await Attandance.find({student: studentId, date : {$gte : dateStart, $lte : dateEnd}});
        if(!attandanceList){
            return res.status(401).send('record not found');
        }

        res.status(200).send(attandanceList);

    } catch(error){
        res.status(400).send(error)
    }
});

exports.student_data_counts = asynchandler(async(req, res, next)=> {
 
    const studentId = req.params.id
    console.log(studentId)
    try{
        // const [leaves, absents, presents] = await Promise.all([
        //     Leave.find({student: studentId}).countDocuments({}).exec(),
        //     Attandance.find({student: studentId, status: 'Absent'}).countDocuments({}).exec(),
        //     Attandance.find({student: studentId, status: 'Present'}).countDocuments({}).exec(),
        // ]);

        const leaves = await Leave.find({student: studentId}).countDocuments({}).exec();
        const absents = await  Attandance.find({student: studentId, status: 'Absent'}).countDocuments({}).exec();
        const presents = await  Attandance.find({student: studentId, status: 'Present'}).countDocuments({}).exec();

        if(!leaves || !absents || !presents ){
            return res.status(500).send('record not found')
        }

        res.status(200).send([leaves, absents, presents])
    } catch (error) {
        res.status(400).send(error.message)
    }
    
});

exports.all_data_counts = asynchandler(async(req, res, next)=> {

    const date = req.body.date
    try{

        const ofDate = new Date(date)
        
        const leaves = await Leave.countDocuments({startDate : ofDate }).exec();
        const absents = await  Attandance.countDocuments({date : ofDate, status: 'Absent'}).exec();
        const presents = await  Attandance.find({date : ofDate, status: 'Present'}).countDocuments({}).exec();

        

        res.status(200).send([leaves, absents, presents])
    } catch (error) {
        res.status(400).send(error.message)
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