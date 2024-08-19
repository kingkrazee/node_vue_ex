import {compare} from "bcrypt";
import { getUserDb } from "../model/userDb.js";
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()
// const checkUser= async(req,res,next)=>{
//     const {username,password}= req.body;
//     let hashedPassword = (await getUserDb(username)).password
//     compare(password,hashedPassword,(err,result)=>{
//         if(!err){
//             next()
//             return
//         }
//         res.send('Password incorrect')
//     })
// }
const checkUser= async(req,res,next)=>{
    const {username,password} = req.body;
    let hashedPassword = (await getUserDb(username)).password
    let result = await compare(password, hashedPassword)
    if(result==true){
        let token = jwt.sign({username:username}, process.env.SECRETE_KEY,{expireIn:'1h'})
            console.log(token);
            req.body.token = token
        next()
    } else{
        res.send('Password incorrect')
    }
  }

const verifyAToken =(req,res,next)=>{
    let {cookie} = req.headers
    //checks if the token exist first
    let token = cookie && cookie.split('=')[1] 
    //jwt and token
    console.log(req.headers);
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            res.json({message:'Token is inavalid'})
            return
        }
        req.body.username = decoded.username
        //req.body = decoded.username
        //req.body.user = decoded
        console.log(decoded); 
    })
    next()
}
export {checkUser, verifyAToken}