import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import {v2 as cloudinary} from "cloudinary";
import { getBase64 ,  getSockets } from "../lib/helper.js";


const cookieOptions = 
 {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite:"none",
    httpOnly: true,
    secure: true,
    
}
const connectDB = (uri)=>{
    mongoose
     .connect(uri, {dbName:"Xsparx"})
     .then((data)=> console.log(`Connected to DB: ${data.connection.host}`))
     .catch((err)=>{
        throw err
     });

};
const sendToken = (res,user,code,message)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(code).cookie("xsparx-token",token,cookieOptions).json({
        success: true,
        user,
        message,
      
    });
};

const emitEvent = (req, event,  users, data)=>{
    const io = req.app.get("io");
    const usersSocket = getSockets(users);
    io.to(usersSocket).emit(event,data)
  
};
   
   const uploadFilesToCloudinary = async(files=[])=>{

    const uploadPromises = files.map((file)=>{
        return new Promise((resolve,reject)=>{
            cloudinary.uploader.upload(
                getBase64(file), {
              resource_type: "auto",
              public_id: uuid(),

            },(error, result)=>{
                if (error) return reject(error);
                resolve(result);
            });
               
        });
    });
      try {
        const result = await Promise.all(uploadPromises);
        const formmattedResults = result.map((result)=>({
            public_id: result.public_id,
            url: result.secure_url,
          }));
        return formmattedResults;
      } catch(err) {
        throw new Error("Error uploading file to cloudinary", err);
      }
   };

const deleteFilesFromCloudinary = async(public_ids)=>{
    // delete files from cloudinary
}
export {
    cookieOptions,
     connectDB,
     sendToken,
     emitEvent,
     deleteFilesFromCloudinary,
     uploadFilesToCloudinary
    };