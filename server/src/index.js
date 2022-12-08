const express = require("express")
const bodyparser = require("body-parser")
let app = express()
const route = require("./route/route")
const { default: mongoose } = require("mongoose")
const multer = require("multer")

app.use(bodyparser.json())
app.use(multer().any())

app.use("/",route)

mongoose.connect("mongodb+srv://spacespider:admin@cluster0.0ps1ymn.mongodb.net/doc-project",{useNewUrlParser:true})
.then(()=>console.log("mongodb connected")).catch(err=>console.log(err))

app.listen(4000,()=>{
    console.log("express app running on",4000)
})