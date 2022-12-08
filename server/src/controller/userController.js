const userModel = require("../model/userModel")
const imageModel = require("../model/imageModel")
// const multer = require("multer")
// const path = require('path')
const jwt = require("jsonwebtoken")
const fs = require("fs")



let createUser = async (req,res)=>{
    try{
        res.setHeader('Access-Control-Allow-Origin','*')
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        let files = req.files

        //validations for name
        if(!data.name) return res.status(400).send({status:false, message:"name is required"})
        if(typeof data.name!=="string") return res.status(400).send({status:false, message:"name should be a string"})
        if(data.name.length==0) return res.status(400).send({status:false, message:"name can't be empty"})

        //validations for phone
        if(!data.phone) return res.status(400).send({status:false, message:"phone is required"})
        if(typeof data.phone!=="string") return res.status(400).send({status:false, message:"phone should be a string"})
        if(data.phone.length==0) return res.status(400).send({status:false, message:"phone can't be empty"})
        if(await userModel.findOne({phone:data.phone})) return res.status(400).send({status:false, message:"phone already exist"})

        //validations for email
        if(!data.email) return res.status(400).send({status:false, message:"email is required"})
        if(typeof data.email!=="string") return res.status(400).send({status:false, message:"email should be a string"})
        if(data.email.length==0) return res.status(400).send({status:false, message:"email can't be empty"})
        if(await userModel.findOne({email:data.email})) return res.status(400).send({status:false, message:"email already exist"})

        //validations for password
        if(!data.password) return res.status(400).send({status:false, message:"password is required"})
        if(typeof data.password!=="string") return res.status(400).send({status:false, message:"password should be a string"})
        if(data.password.length==0) return res.status(400).send({status:false, message:"password can't be empty"})

        // //validations for photo
        // data.profile = files[0].buffer

        let createdData = await userModel.create(data)
        return res.status(201).send({status:true, message:"created", data:createdData})

    }catch(err){
        res.status(500).send({status:false, message : err.message})
    }
}


let login = async (req,res)=>{
    try{
        let data = req.body
        console.log(data)

    //validations for email
    if(!data.email) return res.status(400).send({status:false, message:"email is required"})
    if(typeof data.email!=="string") return res.status(400).send({status:false, message:"email should be a string"})
    if(data.email.length==0) return res.status(400).send({status:false, message:"email can't be empty"})

    //validations for password
    if(!data.password) return res.status(400).send({status:false, message:"password is required"})
    if(typeof data.password!=="string") return res.status(400).send({status:false, message:"password should be a string"})
    if(data.password.length==0) return res.status(400).send({status:false, message:"password can't be empty"})

    let user = await userModel.findOne({email:data.email, password:data.password})
    if(!user) return res.status(401).send({status:false, message:"invalid credentials"})

    const token = jwt.sign(
        {
          userId: user._id,
        },
        "project",
        { expiresIn: "10hr" }
      );
    res.setHeader("x-api-key",token)
    res.status(200).send({status:true, message: "Login Successful", token: token})
    }catch(err){
        res.status(500).send({status:false, message : err.message})
    }
    
}


let getuser = async (req,res) => {
    try{
        

        let data = await userModel.findOne({_id:req.decodedToken.userId})

        if(!data) return res.status(404).send({status:false, message:"User not found"})

        return res.status(200).send(data)

    }catch(err){
        res.status(500).send({status:false, message : err.message})
    }
}


let updateuser = async(req,res)=>{
    try{

        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data.name.length)

        if(Object.keys(data).length===0) return res.status(400).send({status:false, message:"please provide details to update"})

        if(data.name){
            if(typeof data.name!=="string") return res.status(400).send({status:false, message:"name should be a string"})
            if(data.name.trim().length==0) return res.status(400).send({status:false, message:"name can't be empty"})
        }

        if(data.phone){
            if(typeof data.phone!=="string") return res.status(400).send({status:false, message:"phone should be a string"})
            if(data.phone.trim().length==0) return res.status(400).send({status:false, message:"phone can't be empty"})
            if(await userModel.findOne({phone:data.phone})) return res.status(400).send({status:false, message:"phone already exist"})
        }

        if(data.email){
            if(typeof data.email!=="string") return res.status(400).send({status:false, message:"email should be a string"})
            if(data.email.trim().length==0) return res.status(400).send({status:false, message:"email can't be empty"})
            if(await userModel.findOne({email:data.email})) return res.status(400).send({status:false, message:"email already exist"})
        }

        if(data.password){
            if(typeof data.password!=="string") return res.status(400).send({status:false, message:"password should be a string"})
            if(data.password.trim().length==0) return res.status(400).send({status:false, message:"password can't be empty"})
        }

        let updatedData = await userModel.findByIdAndUpdate(req.decodedToken.userId,data,{new:true})

        res.status(200).send({status:true, message: "update successful", data: updatedData})


    }catch(err){
        res.status(500).send({status:false, message : err.message})
    }
}

module.exports.createUser = createUser
module.exports.login = login
module.exports.getuser = getuser
module.exports.updateuser = updateuser