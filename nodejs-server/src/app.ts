import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import db from './config/database.config';

const app = express();

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
app.get('/api', (req, res) => {
    res.json({hello: 'world'});
});

export default app;