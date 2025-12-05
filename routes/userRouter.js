import express from 'express';
import { createuser, loginUser } from '../controllers/userController.js';

const userrouter = express.Router();

userrouter.post("/",createuser)
userrouter.post("/login",loginUser) 

export default userrouter;