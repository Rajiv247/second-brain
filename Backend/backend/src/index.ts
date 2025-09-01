


export {}; // important so it's a module
                                                        // https://github.com/100xdevs-cohort-3/ all code
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}



import express from "express";
import mongoose from "mongoose";
import { Randaom } from "./utils.js";
import jwt from "jsonwebtoken";
import { z } from "zod";                                       // // /netstat -ano | findstr :3000
import bcrypt from "bcrypt"
import { JWT_SECRET } from "./config.js";
import { UserMiddleware } from "./midddleware.js";

import cors from "cors";


import { UserModel, ContentModel,LinkModel } from "./db.js";

const app = express();


app.use(express.json());
app.use(cors());


app.post("/api/v1/signup" , async (req , res) => {

   

    const reqBody = z.object({
         UserName: z.string().min(3).max(23),
         Password : z.string().min(3).max(22),
    });

    const safeparseBody = reqBody.safeParse(req.body);

    if(!safeparseBody.success){
       return res.status(403).json({
            msg :" wrong credtintial8",
            error : safeparseBody.error,
        });
    }

     const { UserName , Password} = req.body;

     const hashPassword = await bcrypt.hash(Password, 6);


     try{
        await UserModel.create({
            UserName : UserName,
            Password: hashPassword,
        });
    }catch(error){
        res.json({
            msg:"you have already exist"
        })
    }
     res.status(200).json({
            msg:"you are signup"
        })
})


   app.post("/api/v1/signin" , async (req , res) => {

    const reqBody = z.object({
        UserName : z.string().min(3).max(23),
        Password : z.string().min(3).max(23),
    })

    const safeparseBody = reqBody.safeParse(req.body);

    if(!safeparseBody.success){
       return res.status(400).json({
            msg :"incorrect credential",
            error : safeparseBody.error,
        })
    }

    const { UserName , Password} = req.body;

    const user = await UserModel.findOne({
        UserName
    })

    if(!user){  
        res.status(403).json({
            msg : "user not found",
        })
    }

        const matchpassword = await bcrypt.compare(Password , String(user?.Password));
        // it should check that password and user is null or not

        if(matchpassword){
            const token = jwt.sign({
                id:user?._id
            }, JWT_SECRET)

            res.json({
                token : token
            })
        }else{
            res.sendStatus(403).json({
                msg :" incorrect credential2"
            })
        }

        res.status(200).json({
            msg :"your are sign in "
        })

   })

   app.post("/api/v1/content" ,UserMiddleware , async(req ,res) => {

       
    const {title , link , type} = req.body;

//    const content = await ContentModel.create{{}}
    await ContentModel.create({
        link, 
        title,
        type,
    
         userId: req.userId,
         tags :[],
    })

    res.json({
        msg :"content are created"
        // contentId : ContentModel._id
    })
   })

   app.get("/api/v1/content" , UserMiddleware , async (req , res) => {

    
    const userId = req.userId;

    const content = await ContentModel.find({userId : userId}).populate("userId" , "UserName");

    res.json({
        content
    })

   })
     

   // in this it will create share hash for share link and suppose a user alredy have this hash in LinkModel
   //then return the hash of that user , and i give false in share = false it will delete that userId from LinkModel
   app.post("/api/v1/brain/share" , UserMiddleware , async (req , res) => {
         
         const {share} = req.body;

    if(share){
        const Existinglink = await LinkModel.findOne({UserId :req.userId});
        if(Existinglink){
            res.json({hash : Existinglink.hash});
            return;
        }

        const hash = Randaom(10);
        
        await LinkModel.create({UserId :req.userId , hash});
        res.json({hash})
    }else{
        await LinkModel.deleteOne({UserId : req.userId});
        res.json({msg : "Remove link"})
    }
    
   

   });

   app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    // Find the link using the provided hash.
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
        return;
    }

    // Fetch content and user details for the shareable link.
    const content = await ContentModel.find({ userId: link.UserId });
    const user = await UserModel.findOne({ _id: link.UserId });

    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }

    res.json({
        username: user.UserName,
        content
    }); // Send user and content details in response.
});

    
   app.delete("/api/v1/content" , UserMiddleware, async (req , res) => {

        const ContentId = req.body.ContentId;

        await ContentModel.deleteMany({
            ContentId,

            
            userId : req.userId
        })
         res.json({ message: "Removed link" });
   })


   app.listen(3000);