const express = require("express")
const router = express.Router()
const user = require("../controller/userController")
// const upload = require("../middleware/upload")
const middleware = require("../middleware/auth")
// const fs = require("fs")
// const multer = require("multer")


// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"../img")
//     },
//     filename: (req,file,cb) =>{
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({storage:storage})


router.post("/signup",user.createUser)
router.post("/login",user.login)
// router.post("/upload",upload.single('testImage'),(req,res)=>{
//     const saveImage = new imageModel({
//         name : req.body.name,
//         img:{ 
//             data : fs.readFileSync("../img/"+ req.file.filename),
//             contentType:"image/jpg"
//         }
//     })
//     saveImage.save()
//     .then(res=>res.send("image is saved"))
//     .catch(err => res.send(err.message))

// })

router.get("/user",middleware.auth,user.getuser)
router.put("/user",middleware.auth,user.updateuser)


module.exports = router