import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// settings 
app.set('port', 4000);

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