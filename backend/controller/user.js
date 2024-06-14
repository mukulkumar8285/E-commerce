const express = require("express");
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const router = express.Router();
const catchAsyncError  = require("../middelware/catchAsyncErrors");
const sendToken  = require("../utils/jwtToken");



router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const fileName = req.file.filename;
      const filePath = `uploads/${fileName}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Failed to delete file",
          });
        } 
      });

      return next(new ErrorHandler("User Already Exists", 400));
    }

    const fileName = req.file.filename;
    const fileUrl = `uploads/${fileName}`;
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    console.log(user);

    const activationToken = createActivationToken(user);
    const activationurl = `http://localhost:3000/activation/${activationToken}`;
    try{
      
      
      // This is where you are trying to send a second response
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Please click on this link to activate your account: ${activationurl}`,
      });
      res.status(201).json({
        success: true,
        message: "User Created Successfully",
        activationToken: activationToken,
      });
      // res.json({
      //   success: true,
      //   message: `Email Sent Successfully ${user.email} to activate your account`,
      // });
      
}catch(error){
    return next(new ErrorHandler(error.message, 500))
    
}

  } catch (err) {
    console.log(err);
    next(new ErrorHandler("Failed to create user", 400));
  }
});

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: '5m'
  });
}

//activateUser

router.post("/activation" , catchAsyncError(async(req , res , next)=>{
  try{
  const { activation_token } = req.body;
  console.log("This Is A Token" ,activation_token)

  const newUser = jwt.verify(activation_token , process.env.ACTIVATION_SECRET);

  if(!newUser){
    return next(new ErrorHandler("Invalid Activation Token", 401));
  }
    const {name , email , password ,avatar} = newUser;
    let user = await User.findOne({email});
    if(user){
      return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({
      name,
      email,
      avatar ,
      password,
    })

    sendToken(user , 201 , res);
  

  }catch{
    return next(new ErrorHandler("Invalid Activation Token", 500)); 
  }

}))

module.exports = router;
