import { checkSchema , validationResult } from "express-validator";
import createHttpError from "http-errors";

const productSchema = {
    
 name: {
 in : ["body"],
 errorMessage: "name need to be a string",
 isString : true
 },
  description: {
 in : ["body"],
errorMessage: "Put description"
 },
   brand: {
 in : ["body"],
errorMessage: "Put brand name"
 },
    price: {
 in : ["body"],
isNumber : {
    errorMessage: "Put Price"
}
 },
 category:{
    in : ["body"],
    }
}

export const checkProductSchema = checkSchema(productSchema);

export const checkValidationResult = (req,res,next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        next(createHttpError(400, "Validation errors in request body!"))
    } else {
        next();
    }
}