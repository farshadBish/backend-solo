
import  express  from "express";
import {fileURLToPath} from 'url'
import { dirname, join} from "path";
import fs from 'fs'
import uniqid from 'uniqid';
import createHttpError from "http-errors";
import { checkProductSchema, checkValidationResult } from "./validation.js";

const postsRouter = express.Router()

const postsJsonPath = join(dirname(fileURLToPath(import.meta.url)) , "posts.json")
console.log(postsJsonPath);
const getPosts = () => JSON.parse(fs.readFileSync(postsJsonPath)) 
const writePosts = (postsArray) => fs.writeFileSync(postsJsonPath , JSON.stringify(postsArray))

postsRouter.post("/" , checkProductSchema, checkValidationResult ,(req,res,next) => {
    try {
        const newPost = {...req.body , createdAt : new Date(),updatedAt : new Date() ,_id: uniqid() }
        const posts = getPosts();
        posts.push(newPost)
        writePosts(posts)
        res.status(201).send({_id: newPost._id})
    } catch (error) {
        next(error)
    }
})
postsRouter.get("/" , (req,res,next) => {
    try {
        const posts = getPosts()
        res.send(posts);
        if(req.query && req.query.name){
            const filteredPosts = posts.filter(post => post.name === req.query.name)
            res.send(filteredPosts)
        }else{
            res.send(posts)
        }       
    } catch (error) {
        next(error)
    }
    }
)
postsRouter.get("/:postId/reviews" , (req,res,next) => {

})
postsRouter.post("/:postId/reviews" , (req,res,next) =>{

})
postsRouter.get("/:postId" , (req,res,next) => {
    try {
        const posts = getPosts()
        const foundPost = posts.find(post => post._id === req.params.postId)
        if (foundpost) {
            res.send(foundPost)
        } else {
            next(createHttpError(404, `Book with id ${req.params.postId} not found`))
        }
    } catch (error) {
        next(error)
    }
})
postsRouter.put("/:postId" , (req,res,next) => {
    try {
        const posts = getPosts()
        const index = posts.findIndex(post => post._id === req.params.postId)
        if (index !== -1) {
            const oldPost = posts[index]
            const updatedPost = {...oldPost , ...req.body , updatedAt : new  Date()}
            posts[index] = updatedPost
            writePosts(posts);
            res.send(updatedPost);
        } else {
            next(createHttpError(404, `Book with id ${req.params.postId} not found`))
        }
    } catch (error) {
        next(error)
    }
})
postsRouter.delete("/:postId" , (req,res,next) => {
    try {
        const foundPost = posts.find(post => post._id === req.params.postId)
        const posts = getPosts();
        const remainingPosts = posts.filter(post => post._id !== req.params.postId);
        if (foundpost) {
            writePosts(remainingPosts);
            res.status(204).send()
        } else {
            next(createHttpError(404, `Book with id ${req.params.postId} not found`))
        }
        
    } catch (error) {
        next(error)
    }
})


export default postsRouter