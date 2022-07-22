import  express from "express";
import listEndpoints from "express-list-endpoints";
import postsRouter from "./apis/posts/index.js";
import cors from 'cors'
import { badRequestHandler , notfoundHandler , unauthorizedHandler , genericServerErrorHandler } from "./errorHandlers.js";

const server = express()
const port = 3002
server.use(cors());
server.use(express.json())

// ********************** ENDPOINTS *****************
server.use("/products",postsRouter)

// ERRORS

server.use(badRequestHandler)
server.use(notfoundHandler)
server.use(unauthorizedHandler)
server.use(genericServerErrorHandler)

server.listen(port,()=>{
    console.table(listEndpoints(server))
    console.log("sever is running on port : ", port);
})