import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';

const mongoURL = "mongodb+srv://admin:1234@cluster0.741npn7.mongodb.net/?appName=Cluster0"


mongoose.connect(mongoURL).then(() => {
    console.log("MongoDB connected");
})

const app = express();

app.use(express.json());

app.use(
    (req,res,next)=>{

        const authorizationHeader = req.header("Authorization");

        if(authorizationHeader != null){

            const token = authorizationHeader.replace("Bearer ", "")

            console.log(token);

            jwt.verify(token, "secretKey96$2025", 
                (error,content)=>{
                    if(content == null){
                        console.log("Invalid token");

                        res.json({
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




app.use("/users",userRouter);
app.use("/products",productRouter);


app.listen(3000,
     () => {
        console.log("Server is running ");
        }
    );