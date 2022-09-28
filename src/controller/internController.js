const collegeModel = require('../model/collegeModel');
const internModel = require('../model/internModel');
const validator = require ("../validator/validator");
const createintern = async function (req , res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    try {
        let data = req.body;
        let {name , mobile , email }=data
        
        let college = data.collegeName;
        let newintern = await collegeModel.findOne({name : college });


        // ----------------- Checking the body is empty or not-------------------------------------------------
        if (Object.keys(data).length==0)  return res.status(400).send({status : false , message : "body is empty"})
        
        //-------------------checking the name validation-------------------------------------------- 
        if (!validator.isValidElem(name)) return res.status(400).send({status : false , message : "name is require"})
        if (!validator.isValidName(name)) return res.status(400).send({status : false , message : "name should be in alphabets"})

        // ----------------------checking the email validation-----------------------------------------
        if (!validator.isValidElem(email)) return res.status(400).send({status : false , message : "email is require "})
        if (!validator.isValidEmail(email)) return res.status(400).send({status : false , message : "email must in correct formate"})
        let findemail= await internModel.findOne ({ email})
        if (findemail) return res.status(400).send({status : false , message : "email is already present"})

        // -----------------------checking the mobile number validation--------------------------------------------------
        if (!validator.isValidElem(mobile)) return res.status(400).send({status : false , message : "mobile number is require "})
        if (!validator.isValidmobile(mobile)) return res.status(400).send({status : false , message : "mobile number must be 10 digits"})
        let findmobile= await internModel.findOne ({ mobile})
        if (findmobile) return res.status(400).send({status : false , message : "mobile number is already present"})
         
        // -------------------checking the intern is present or not----------------------------------------
        if(!newintern) return res.status(404).send({status : false, message : "No intern found with proper college name"});
        let collegeid = newintern["_id"];
        
        // ---------------------creating a new object----------------------------------------------
        let newIntern = {
            name : name.trim(),
            mobile : mobile.trim(),
            email : email,
            collegeId : collegeid
        }
        let saveData= await internModel.create(newIntern)
       
        return res.status(201).send({ status : true , message : "intern created succesfuly" ,data : saveData });

    }catch (err) {
        return res.status(400).send({status : false , message : err.message})
    }
}


module.exports.createintern =createintern