import express from 'express';
import { createuser, loginUser,getUser, googleLogin } from '../controllers/userController.js';


const userrouter = express.Router();

userrouter.post("/register",createuser)
userrouter.post("/login",loginUser) 
userrouter.get("/", getUser);
userrouter.post("/google-login", googleLogin);

export default userrouter;