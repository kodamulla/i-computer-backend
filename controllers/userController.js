import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export function createuser(req, res) {
    const data = req.body;
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const user = new User({
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        
    });

    user.save()
        .then(() => {
            res.json({
                message: "User created successfully"
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then( 
        (user) => {
            if (user == null) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (isPasswordCorrect) {
                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isEmailVerified: user.isEmailverrified,
                    image: user.image
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET);

                
                res.json({
                    message: "Login successful",
                    token: token,
                    role: user.role 
                });
            } else {
                res.status(401).json({
                    message: "Invalid password"
                });
            }
        }
    ).catch(err => {
        res.status(500).json({ message: "Internal Server Error" });
    });
}

export function isAdmin(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.role !== "admin") {
        return false;
    }
    return true;
}

export function getUser(req, res) {
    if (req.user == null) {
        return res.status(401).json({
            message: "Unauthorized"
        })
        return
    }
    res.json(req.user);
}

export async function googleLogin(req, res) {
    console.log(req.body.token)
    try{
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/tokeninfo", {
            headers: {
                Authorization: `Bearer ${req.body.token}`
            }
            });
            console.log(response.data)

            const user = await User.findOne({ email: response.data.email });
            if(user == null){
                const newUser = new User({
                    email: response.data.email,
                    firstName: response.data.given_name,
                    lastName: response.data.family_name,
                    password:"123",
                    image: response.data.picture,
                });
                await newUser.save();

                const payload = {
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    role: newUser.role,
                    isEmailVerified: true,
                    image: newUser.image
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET);

                
                res.json({
                    message: "Login successful",
                    token: token,
                    role: newUser.role 
                });
                
            }else{
                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isEmailVerified: user.isEmailverrified,
                    image: user.image
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET);

                
                res.json({
                    message: "Login successful",
                    token: token,
                    role: user.role 
                });
            }

    }catch(error){
        res.status(500).json({ 
            message: "Google login failed" ,
            error: error.message});
    }
}