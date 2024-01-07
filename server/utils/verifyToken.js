import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";



///verifying user is authenticated or not
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};



///checking user is authorized to delete or edit any content or not
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    })
}
///checking user is admin or not to delete or edit any content or not
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(!!req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    })
}