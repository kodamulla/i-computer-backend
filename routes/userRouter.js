import express from 'express';
import { createuser, loginUser,getUser, googleLogin,sendOTP, validateOTPAndUpdatePassword, getAllUsers, updateUsersStatus } from '../controllers/userController.js';


const userrouter = express.Router();

userrouter.post("/register",createuser)
userrouter.post("/login",loginUser) 
userrouter.get("/", getUser);
userrouter.post("/google-login", googleLogin);
userrouter.get("/send-otp/:email", sendOTP);
userrouter.post("/validate-otp", validateOTPAndUpdatePassword);
userrouter.get("/users-all", getAllUsers);
userrouter.put("/toggle-block/:email", updateUsersStatus);


export default userrouter;