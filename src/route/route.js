const express = require('express')
const route = express.Router()
const collegeController = require ("../controller/collegeController")
const internController =require("../controller/internController")

route.get('/test-me' ,function(req,res){
    res.send({msg : "working fine "})
})



//intern creation API
route.post('/functionup/interns',internController.createintern)

//college Creation API
route.post('/functionup/colleges',collegeController.createCollege )

// get Data from College name in query
route.get('/functionup/collegeDetails',collegeController.getdata)

module.exports=route
