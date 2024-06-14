//This auth.js file handle Some Route of user And sales Route.


const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken"); //if user don't have a token then show him the error 
