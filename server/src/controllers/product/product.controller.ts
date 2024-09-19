import { Request, Response } from 'express';
import Product from '@/models/product/product.model.schema';
import jsonRes from '@/utils/jsonResponse.util';

export const createProduct = async (req: Request, res: Response) => {

  try {

    const product = new Product(req.body);
    await product.save();
    const success_code = 200
    const success_message = `Data created successfully`
    const data_payload = {
      productId:product?._id
    }

    return jsonRes(res,success_code,success_message,data_payload)

  } catch (error) {

    const error_code = 500
    const error_message = `Something went wrong,Try again`
    const data_payload = error

    return jsonRes(res,error_code,error_message,data_payload)

  }
};

export const getProducts = async (req: Request, res: Response) => {

  try {

    // Parse query parameters
    const page: number = parseInt(req.query.page as string) || 1;
    const size: number = parseInt(req.query.size as string) || 10;

    // Ensure page and size are positive integers
    const validPage = Math.max(page, 1);
    const validSize = Math.max(size, 1);

    // Calculate the offset
    const skip = (validPage - 1) * validSize;

    // Fetch inventory items from MongoDB
    const [items, totalItems] = await Promise.all([
      Product.find().skip(skip).limit(validSize).exec(),
      Product.countDocuments().exec()
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / validSize);

    // Response of successfull
    const success_code = 200
    const success_message = "All products data fetched successfully"
    const data_payload = {
      "pagination": {
        "page": validPage,
        "size": validSize,
        "totalItems": totalItems,
        "totalPages": totalPages
        },
        "items": items
    }

    return jsonRes(res,success_code,success_message,data_payload)


  } catch (error) {

    const error_code = 500
    const error_message = `Something went wrong,Try again`
    const data_payload = error

    return jsonRes(res,error_code,error_message,data_payload)

  }

};

export const getProduct = async (req: Request, res: Response) => {
  try {

    if (!req.params.id){

      const error_code = 400
      const error_message = `Product id required`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)
      
    } 

    
    const product = await Product.findById(req.params.id);

    if (!product){

      const error_code = 404
      const error_message = `Data not found.`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)
    } 

    const success_code = 200
    const success_message = `Data fetched successfully`
    const data_payload = product

    return jsonRes(res,success_code,success_message,data_payload)

  } catch (error) {

    const error_code = 500
    const error_message = `Something went wrong,Try again`
    const data_payload = error

    return jsonRes(res,error_code,error_message,data_payload)
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {

    
    if (!req.params.id){

      const error_code = 400
      const error_message = `Product id required`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)

    } 


    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product){

      const error_code = 404
      const error_message = `Data not found.`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)
    } 

    const success_code = 200
    const success_message = `Data updated successfully`
    const data_payload = product

    return jsonRes(res,success_code,success_message,data_payload)

  } catch (error) {

    const error_code = 500
    const error_message = `Something went wrong,Try again`
    const data_payload = error

    return jsonRes(res,error_code,error_message,data_payload)

  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {

    if (!req.params.id){

      const error_code = 400
      const error_message = `Product id required`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)

    } 

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product){

      const error_code = 404
      const error_message = `Data not found.`
      const data_payload = null
  
      return jsonRes(res,error_code,error_message,data_payload)
    } 

    const success_code = 200
    const success_message = `Data deleted successfully`
    const data_payload = {
      productId:product?._id
    }

    return jsonRes(res,success_code,success_message,data_payload)

  } catch (error) {
    
    const error_code = 500
    const error_message = `Something went wrong,Try again`
    const data_payload = error

    return jsonRes(res,error_code,error_message,data_payload)

  }
};