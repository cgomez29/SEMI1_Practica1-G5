import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import db from './config/database.config';
import userRoutes from './routes/auth.routes';

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
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

// routes 
app.get('/api', (req : Request, res : Response) => {
    res.json({hello: 'world'});
});
app.use(``, userRoutes);

export default app;