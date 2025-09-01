
import { NextFunction, Request,Response } from "express";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";


import { JWT_SECRET } from "./config.js";

interface AuthRequest extends Request {
    userId?: string;
}

export const UserMiddleware = async (req : AuthRequest , res: Response , next: NextFunction) => {

    // const token = req.headers.token;
    const header = req.headers["authorization"];
    

    try{

        const decoded = jwt.verify(header as string , JWT_SECRET)  as { id: string }
        // as { id: string };
        // remember jwt is object not srting

        if(decoded){
              
            if(typeof decoded === "string"){
                res.status(403).json({
                    msg :"you are not login"
                })
                  return;
            }


              req.userId = (decoded as JwtPayload ).id

            next();
        }
    }catch(e){
        res.status(400).json({
            msg: " some thing went wrong",
        })
    }


    

  

}