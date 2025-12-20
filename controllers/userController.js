import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function createuser(req, res) {
    const data = req.body;
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const user = new User({
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role, 
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