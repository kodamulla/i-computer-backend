import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRouter from './routes/orderRouter.js';
dotenv.config();

const mongoURL = process.env.MONGO_URL;


mongoose.connect(mongoURL).then(() => {
    console.log("MongoDB connected");
})

const app = express();
app.use(cors());

app.use(express.json());

app.use(
    (req,res,next)=>{

        const authorizationHeader = req.header("Authorization");

        if(authorizationHeader != null){

            const token = authorizationHeader.replace("Bearer ", "")

            
            
            jwt.verify(token, process.env.JWT_SECRET, 
                (error,content)=>{
                    if(content == null){
                        

                        res.status(401).json({
                            message: "Invalid token"
                        });

                        return
                    }else{
                        console.log(content);
                        req.user = content;
                        next();

                    }

                }
            )
        }else{
            next();
        }
        

        
        
    }
)




app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);


app.listen(3000,
     () => {
        console.log("Server is running ");
        }
    );