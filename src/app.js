import express from 'express';
// import path from 'path';
import morgan from 'morgan'
import cors from 'cors';

const app = express();
app.use(cors());
app.use(morgan('dev'));

// app.use(express.static(path.join(__dirname, '/public')));

export default app;