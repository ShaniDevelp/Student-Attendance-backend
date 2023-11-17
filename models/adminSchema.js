const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema} = mongoose;

const adminSchema = new Schema({

    name : {
        type : String,
        required : true,
        trim : true,
        lowerCase : true
    },

    email : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Email doen\'t exist")
            }
        }
    },

    password : {
        type : String,
        required: true,
        minLength : 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password must not contain password")
            }
        }

    },

    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]


}, {timestamps : true});

adminSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token
};

//Hash plain password before saving
adminSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

module.exports = mongoose.model('Admin', adminSchema);