import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import apiLimiter from '../src/middlewares/rate-limit-validator.js';
import defaultCourse from '../src/course/course.controller.js';
import { createDefaultPosts } from '../src/post/post.controller.js';
import postRoutes from '../src/post/post.routes.js';
import commentRoutes from '../src/comment/comment.routes.js';


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/blog/v1/post", postRoutes)
    app.use("/blog/v1/comment", commentRoutes)
}

const conectarDB = async () => {
    try {
        await dbConnection();
    }catch (error) {
        console.log(`Database connection failed: ${error}`)
        process.exit(1);
    }
}

export const initServer = async () => {
    const app = express();
    try {
        conectarDB();
        defaultCourse();
        createDefaultPosts();
        middlewares(app);
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`);
    }catch (error){
        console.log(`Server init failed: ${error}`);
    }
}