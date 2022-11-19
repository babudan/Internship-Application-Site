const internModel= require ('../model/internModel')
const collegeModel=require ('../model/collegeModel')

const validator= require('../validator/validator')

const createCollege = async function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    try {
        let data = req.body 

        // -------------checking the body is empty or not-----------------------------
        if (Object.keys(data).length==0)  return res.status(400).send({status : false , message : "body is empty "})
        
        // --------------destructuring------------------------------------
        let {name , fullName, logoLink}= data

    // -----------------------checking the college name validation-------------------------------
        if (!validator.isValidElem(name)) return res.status(400).send({status : false , message : "name is require "})
        if (!validator.isValidName(name)) return res.status(400).send({status : false , message : "name should be in alphabets"})
        let findName = await collegeModel.findOne({name})
        if (findName)  return res.status(400).send({status : false , message : "the college name is already present"})
       
        // -----------------------checking the full college name validation---------------------------
        if (!validator.isValidElem(fullName)) return res.status(400).send({status : false , message : "full name is require"})
        if (!validator.isValidName(fullName)) return res.status(400).send({status : false , message : " full name should be in alphabets"})
         
        // ---------------------checking the logo link validation--------------------------------------
        if (!validator.isValidElem(logoLink)) return res.status(400).send({status : false , message : "logoLink is require"})
        if (!validator.isValidLogo(logoLink)) return res.status(400).send({status : false , message : "It should be a link "})
        

        //-----------------------creating a object----------------------------------------
        let document ={
            name : name.trim() ,
            fullName:fullName.trim(),
            logoLink:logoLink.trim()
        }
        
        let saveData = await collegeModel.create(document)
        return res.status(201).send({status: true , msg : "college cretaed", data : saveData})


    }catch(err){
        return res.status(500).send({status :false , message : err.message})
    }
}


const getdata = async function (req , res) {
        res.setHeader('Access-Control-Allow-Origin','*');
try{
    let {collegeName} = req.query
    if (!collegeName){
      return res.status(400).send({ status : true, msg : "collegeName is missing or you left empty" })
    }
    let collegeData= await collegeModel.findOne({name:collegeName}).select({_id:1,name:1,fullName:1,logoLink:1,}).lean()
    if (!collegeData){
      return res.status(400).send({ status : true, msg : "collegeData you have provided is incorrect" })
    }
    let details = await internModel.find({ collegeId: collegeData._id }).select({ _id: 1, name: 1, email: 1, mobile: 1 });
    // lean function convert the data which is coming from database bason data into jason data then we can easily add any key with that object but after using lean you lost many functionalities of that document so you cant modify it again menas the details varaible here but for read only data purpose you can use that.
    collegeData.interns = details;
  
    // var collegenewData = {
    //       name: collegeData.name,
    //       fullName: collegeData.fullName,
    //       logoLink: collegeData.logoLink,  
    //       interns: details
    // }
    return res.status(200).send({ status: true, data: collegeData})
  } catch(err){
    return res.status(500).send({ msg: "Error", err: err.message });
  }
}


module.exports={
    getdata,
    createCollege
}


