const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{

    try{
console.log("req authorization Header" , req.headers.authorization);
const token = req.headers.authorization.split(" ")[1];
// const token = req.cookies.token|| req.headers["authorization"]?.split(" ")[1];
console.log("token", token);

const verifyToken = jwt.verify(token,process.env.jwt_secret);
console.log("verification", verifyToken);

req.body.userId=verifyToken.userId;
console.log("userid",req.body.userId);
next();
    }catch(err){
return res.status(401).send({message :"Unauthorized"});
    }
}

module.exports = auth;