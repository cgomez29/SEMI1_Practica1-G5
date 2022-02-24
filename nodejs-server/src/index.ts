import dotenv from 'dotenv';
dotenv.config();
import app from './app';

app.listen(app.get('port'));