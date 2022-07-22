export const badRequestHandler = (err,req,res,next) => {
    if (err.status === 400) {
        res.status(400).send()
    } else {
        next(err)
        
    }
}

export const unauthorizedHandler = (err,req,res,next) => {
    if (err.status === 401) {
        res.status(401).send()
    } else {
        next(err)
        
    }
}

export const notfoundHandler = (err,req,res,next) => {
    if (err.status === 404) {
        res.status(404).send({ success: false , message: err.message })
    } else {
        next(err)
        
    }
}

export const genericServerErrorHandler = (err,req,res,next) => {
    console.log(err);
    res.status(500).send({message : "Internal server error"})
}