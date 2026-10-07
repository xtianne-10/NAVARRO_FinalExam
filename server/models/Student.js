const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    course: String,
    age: Number
});

//try

module.exports = mongoose.model("Student", studentSchema)