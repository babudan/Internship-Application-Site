const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const internschema = new mongoose.Schema ({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    collegeId : {
        type : objectId,
         ref : "college"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps : true});

module.exports = mongoose.model("Intern" , internschema );