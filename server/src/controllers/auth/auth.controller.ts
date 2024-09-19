import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jsonRes from '@/utils/jsonResponse.util';
import jwt from 'jsonwebtoken';
import { LOGIN_PASSWORD } from '@/config/regex.config'
import { blackList } from '@/var/blackList.var';
import verifyToken from '@/utils/verifyToken.utils'

import User from '@/models/user/user.model.schema';


export const login = async (req: Request, res: Response) => {


  try{

    const { username, password } = req.body;

    if( !username || !password ){
        const error_code = 400
        const error_message = `username or password required`
        const data_payload = null
    
        return jsonRes(res,error_code,error_message,data_payload)
    }

    const user = await User.findOne({ username });

    if (!user){

      const error_code = 404
      const error_message = `User not found`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)
  
      }

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch){

    const error_code = 401
    const error_message = `Invalid user name or password.`
    const data_payload = null

    return jsonRes(res,error_code,error_message,data_payload)

    }

    const token = jwt.sign({ userId: user?._id.toString(), user:username , host: req?.headers?.host }, `${process.env.JWT_SECRET}` ,{
      expiresIn: '8h',
    });

    const success_code = 200
    const success_message = `Successfull login`
    const data_payload = {
      token : token,
      userId : user?._id,
      user: username
    }

    return jsonRes(res,success_code,success_message,data_payload)

  }catch(error:any){

    const error_code = 500
    const error_message = `Something went wrong,Try again`
    const data_payload = error

    return jsonRes(res,error_code,error_message,data_payload)

  }
  

}

export const logout = async (req: Request, res: Response) =>  {

    const tempBlackList = blackList.getValue()
    const token = String(req?.headers?.authorization).replace('Bearer', '').trim()
    tempBlackList.add(token)
    blackList.setValue(tempBlackList)

    if(tempBlackList.has(token)){

      const success_code = 200
      const success_message = `Successfull logout`
      const data_payload = null

      return jsonRes(res,success_code,success_message,data_payload)

    }else{
      // Error
      const error_code = 500
      const error_message = `Something went wrong,Try again`
      const data_payload = null

      return jsonRes(res,error_code,error_message,data_payload)
    }
  
  
}

export const register = async (req: Request, res: Response) => {
  
  try {
    const { username, password, email } = req.body;

    if(!username || !password || !email){

      const error_code = 400
      const error_message = `username, password & email are required`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)
    }

    if(! RegExp(LOGIN_PASSWORD).test(password) ){
      
      const error_code = 400
      const error_message = `The user's password, must be at least 8 characters long, contain at least one number and one alphabet.`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    const success_code = 200
    const success_message = `Successfull registration`
    const data_payload = {
      userId: user?._id
    }

    return jsonRes(res,success_code,success_message,data_payload)

  } catch (error) {

       // Error
       const error_code = 500
       const error_message = `Something went wrong, Try again`
       const data_payload = null
 
       return jsonRes(res,error_code,error_message,data_payload)
  }
  
}

export const checkAuthorization = async ( req: Request, res: Response )=>{

  try{

    const { token } = req.body;


    if (!token){

      const error_code = 401
      const error_message = `No authentication token, authorization denied.`
      const data_payload = null

      return jsonRes(res,error_code,error_message,data_payload)

    }

    const decode  = verifyToken(req,token)

    if (! decode ){

      const error_code = 401
      const error_message = `Token verification failed, authorization denied.`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)

    }
    

    const success_code = 200
    const success_message = `Successfull authorization`
    const data_payload = {
      token : token,
      userId : decode?.userId,
      user: decode?.user
    }

    return jsonRes(res,success_code,success_message,data_payload)

  }catch(error:any){

    const error_code = 500
    const error_message = `Something went wrong,Try again`
    const data_payload = error

    return jsonRes(res,error_code,error_message,data_payload)

  }
}