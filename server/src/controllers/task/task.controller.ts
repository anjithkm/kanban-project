import { Request, Response } from 'express';

import Task from '@/models/task/task.model.schema';
import jsonRes from '@/utils/jsonResponse.util';

export const welcome = async ( req: Request, res: Response )=>{
    res.status(200).send("Welcome");
}

export const getTask = async (req: Request, res: Response) => {
 
    try {

        const tasks = await Task.find({});
    
        // Response of successfull
        const success_code = 200
        const success_message = "All data fetched successfully"
        const data_payload = tasks[0]
    
        return jsonRes(res,success_code,success_message,data_payload)
    
    
      } catch (error) {
    
        const error_code = 500
        const error_message = `Something went wrong,Try again`
        const data_payload = error
    
        return jsonRes(res,error_code,error_message,data_payload)
    
      }

}

export const createTask = async (req: Request, res: Response) => {

    // console.log(req.body,"body")

    try {

        const tasks = new Task({ tasks:req.body.tasks });
        await tasks.save();
        const success_code = 200
        const success_message = `Data created successfully`
        const data_payload = req.body
    
        return jsonRes(res,success_code,success_message,data_payload)
    
      } catch (error) {
    
        const error_code = 500
        const error_message = `Something went wrong,Try again`
        const data_payload = error
    
        return jsonRes(res,error_code,error_message,data_payload)
    
      }


}

export const updatetask = async (req: Request, res: Response) => {

    // console.log(req.body,"body")
    // console.log(req.params.id,"id")

    if (!req.params.id){

        const error_code = 400
        const error_message = `id required`
        const data_payload = null
    
        return jsonRes(res,error_code,error_message,data_payload)
  
      } 

    try{

    const tasks = await Task.findByIdAndUpdate(req.params.id, { tasks:req.body.tasks }, { new: true });

    if (!tasks){

        const error_code = 404
        const error_message = `Data not found.`
        const data_payload = null
    
        return jsonRes(res,error_code,error_message,data_payload)

    } 

    const success_code = 200
    const success_message = `Data updated successfully`
    const data_payload = req.body

    return jsonRes(res,success_code,success_message,data_payload)

  } catch (error) {

    const error_code = 500
    const error_message = `Something went wrong,Try again`
    const data_payload = error

    return jsonRes(res,error_code,error_message,data_payload)

  }


}