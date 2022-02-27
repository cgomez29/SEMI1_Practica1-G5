import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import passport from 'passport';
import passport_middleware from './middlewares/passport.middlewares'

import db from './config/database.config';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/private.routes';

const app: Application = express();

// settings 
const PORT = process.env.PORT;
app.set('port', PORT);

// db conection test
const test = async () => {
    try {
        await db.authenticate();
        console.log('Dabase is connected...');
    } catch (error) {
        console.log(error);
    }
}

test();

// middlewares 
app.use(morgan('dev'));
app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(passport.initialize());
passport.use(passport_middleware);


// routes 
app.use(`/api`, userRoutes);
app.use(`/api`, authRoutes);

export default app;