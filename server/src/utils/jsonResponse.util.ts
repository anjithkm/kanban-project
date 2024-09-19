import { Response,Request } from 'express';
import CircularJSON from 'circular-json';
import status from '@/const/status.const';

export default function jsonRes(
  res: Response,
  code: number,
  message: string,
  payload: any = null,
  req?: Request
) {


  const success = [200, 201].includes(code);

  const url = res?.req.originalUrl
  const params = CircularJSON.stringify(res?.req.params)
  const query =  CircularJSON.stringify(res?.req.query) 
  const headers = CircularJSON.stringify(res?.req.headers)
  const error = JSON.stringify(payload)

  if(!success){
    console.log(`\n \t code: ${code}, \n \t msg:${message} , \n \t error:${error} , \n \t url:${url} , \n \t headers:${headers} , \n \t params:${params}, \n \t query:${query}`)
  }

  return res.status(code).json({
    success: success,
    // status: status[code],
    data: success ? payload : null,
    message: message || status[code],
    error: success ? null : payload,
  });
}
