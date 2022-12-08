let jwt = require("jsonwebtoken")


let authentication = async (req,res,next)=>{
    try{
        let token = req.headers["x-api-key"]
        console.log(token)
        if(!token) return res.status(401).send({status:false, message:"Token is required"})
    
        jwt.verify(token,"project", (err, decodedToken)=>{
            if (err) return res.status(401).send({ status: false, message: "invalid Token" });
            console.log(decodedToken)
            req.decodedToken = decodedToken
            next()
        })

    }catch(err){
        res.status(500).send({status:false, message : err.message})
    }
   
}


module.exports.auth = authentication