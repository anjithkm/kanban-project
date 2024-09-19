import { Request, Response, NextFunction } from 'express';
import verifyToken from '@/utils/verifyToken.utils'
import jsonRes from '@/utils/jsonResponse.util';


export function isValidToken(req: Request, res: Response, next: NextFunction) {

  try {

    const header = Object(req.headers);

    const Authorization = String(header['authorization']);

    let token = null

    if(Authorization){
      token = String(Authorization.replace('Bearer', '').trim()) ;
    }else{
      token = String(req?.query?.token) ;
    }

    if (!token){

      const error_code = 401
      const error_message = `No authentication token, authorization denied.`
      const data_payload = null

      return jsonRes(res,error_code,error_message,data_payload)

    }


    if (! verifyToken(req,token) ){

      const error_code = 401
      const error_message = `Token verification failed, authorization denied.`
      const data_payload = null

      return jsonRes(res,error_code,error_message,data_payload)

    }

    next();

  } catch (error: any) {

      const error_code = 500
      const error_message = `Something went wrong,Try again`
      const data_payload = error

      return jsonRes(res,error_code,error_message,data_payload)

  }
}

export default isValidToken;
