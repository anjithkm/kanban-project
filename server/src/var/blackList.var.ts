import reactiveService from "@/services/reactive.service";
import jwt from 'jsonwebtoken';

export const blackList = new reactiveService(new Set<String>());


blackList.subscribeToChanges((blackList:Set<String>) => {  

    for (const token of blackList) {
     
        try{
            const verified = Object(jwt.verify(`${token}`,`${process.env.JWT_SECRET}`));
            const currentTime = Math.floor(Date.now() / 1000);
            const expTime = verified.exp;
            const remainingTime = expTime - currentTime;
            if(remainingTime<=0){
                blackList.delete(token)
            }

            console.log(`remainingTime ${remainingTime}`,token);

        }catch(error:any){
         console.error("blackList subscribeToChanges jwt error:",error)
        }
    }
  
})