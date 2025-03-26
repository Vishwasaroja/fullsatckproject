const express = require('express');
const User = require('../models/userModel');
const userRoute = express.Router();
const jwt = require('jsonwebtoken');
const auth = require("../middleware/authMiddleware");
const EmailHelper = require("../utils/emailHelper");
userRoute.post('/register', async (req, res) => {

    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: "User already exists"
            })
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "Registration successfull,Please login",
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
})

userRoute.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist,Please Register",
            });
        }
        if (req.body.password !== user.password) {
            return res.send({
                success: false,
                message: "Invalid password",
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d",
        });
        console.log(token);

        // res.cookie('token',token,{
        //     httpOnly:true,
        //     expires: new Date(Date.now() + 24 * 3600000)    ,

        // })
        res.send({
            success: true,
            message: "Login in successufull",
            data: token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "An error ocurred"
        })
    }
})


userRoute.get("/current", auth, async (req, res) => {
    console.log(req.url,req.method);
    console.log("header token ",req.headers["authorization"]);
    const user = await User.findById(req.body.userId);
    console.log("user",user);
    res.send({
        success: true,
        message: "user is Authenticated",
        data: user
    })
})

const otpGenerator = function () {s
    return Math.floor(100000 + Math.random() * 900000);
};
/**
* Math.random(): Generates a random floating-point number between 0 (inclusive) and 1
(exclusive).
Math.random() * 900000: Scales the random number to a range between 0 and 899999.
100000 + Math.random() * 900000: Shifts the range to be between 100000 and 999999.
Math.floor(): Rounds down to the nearest whole number.
*/
userRoute.patch("/forgetpassword", async function (req, res) {
    try {
        /****
        * 1. You can ask for email
        * 2. check if email is present or not
        * * if email is not present-> send a response to the user(user not found)
        * 3. if email is present-> create basic otp-> and send to the email
        * 4. also store that otp-> in the userModel
        *
        * ***/
        if (req.body.email == undefined) {
            return res.status(401).json({
                status: "failure",
                message: "Please enter the email for forget Password",
            });
        }
        // find the user-> going db-> getting it for the server
        let user = await User.findOne({ email: req.body.email });
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found for this email",
            });
        }
        // got the user-> on your server
        const otp = otpGenerator();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        // those updates will be send to the db
        await user.save();
        await EmailHelper("otp.html", user.email, {
            name: user.name,
            otp: otp,
        });
        res.status(200).json({
            status: "success",
            message: "otp sent to your email",
        });
        // send the mail to there email-> otp
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
    // email
});
userRoute.patch("/resetpassword/:email", async function (req, res) {
    //-> otp
    // newPassword and newConfirmPassword
    //-> params-> id
    try {
        let resetDetails = req.body;
        // required fields are there or not
        if (!resetDetails.password || !resetDetails.otp) {
            return res.status(401).json({
                status: "failure",
                message: "invalid request",
            });
        }
        // it will serach with the id-> user
        const user = await User.findOne({ email: req.params.email });
        // if user is not present
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found",
            });
        }
        // if otp is expired
        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                status: "failure",
                message: "otp expired",
            });
        }
        user.password = req.body.password;
        // remove the otp from the user
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "password reset successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure",
        });
    }
});

module.exports = userRoute;