import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { BehaviorSubject } from 'rxjs'

// Create a BehaviorSubject with an initial value
const blackListToken = new BehaviorSubject(new Set<String>());

// Function to get the current value of the reactive variable
export const getValue = () => blackListToken.getValue();

// Function to set a new value to the reactive variable
export const setValue = (newValue:Set<String>) => blackListToken.next(newValue);

// Function to subscribe to changes in the reactive variable
export const subscribeToChanges = (callback:any) => blackListToken.subscribe(callback);

subscribeToChanges((blackList:Set<String>) => {  

    for (const token of blackList) {
     
        try{
            const verified = Object(jwt.verify(`${token}`,`${process.env.JWT_SECRET}`));
            const currentTime = Math.floor(Date.now() / 1000);
            const expTime = verified.exp;
            const remainingTime = expTime - currentTime;
            if(remainingTime<=0){
                blackList.delete(token)
            }

            // console.log(`remainingTime ${remainingTime}`,token);

        }catch(error:any){
         console.error("subscribeToChanges jwt Error:",error)
        }
    }
  
});

export default function verifyToken(req:Request,token:string){

    const blackList = getValue()

    if(blackList.has(token)){
        return false
    }

    // const decoded = jwt.decode(token);

    // if (!decoded || !decoded.exp) {
    //     throw new Error('Invalid token: Missing exp claim');
    // }

    try{

        const verified = Object(jwt.verify(`${token}`,`${process.env.JWT_SECRET}`));

        if(JSON.stringify(req.headers.host)==JSON.stringify(verified.host)){
            return verified
        }else{
            return false
        }

    }catch(err){
        return false
    }

}

