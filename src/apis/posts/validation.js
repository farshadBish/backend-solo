import { checkSchema , validationResult } from "express-validator";
import createHttpError from "http-errors";

const productSchema = {
 name: {
 in : ["body"],
 isString : {
errorMessage: "name need to be a string"
}
 },
  description: {
 in : ["body"],
errorMessage: "Put description"
 },
   brand: {
 in : ["body"],
errorMessage: "Put description"
 },
    price: {
 in : ["body"],
isNumber : {
    errorMessage: "Put description"
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