import mongoose from "mongoose";

import {model ,  Schema} from "mongoose";

import { MONGO_URI } from "./config.js";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(" MongoDB connection error:", err));

const UserSchema = new Schema ({

    UserName: {type : String , unique :true , require:true},
    Password : {type :String , unique: true , require :true}

});

export const UserModel = model("user" , UserSchema);


// const ContentType = ['image' , 'link', 'video','audio', 'twitter'];

const ContentSchema = new Schema({
    link: String,
    title : String,
    type :  String,
    tags : [{type : mongoose.Types.ObjectId , ref:"tag"}],
    userId: [{
        type : mongoose.Types.ObjectId,
        ref : "user",
        require: true,
    }]
});

export const ContentModel = model("content" , ContentSchema);

const LinkSchema = new Schema({
    hash: String,
    
    UserId : {type :mongoose.Types.ObjectId, ref:"user", require: true, unique:true}

});

export const LinkModel =  model("Link" , LinkSchema);