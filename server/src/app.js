import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import errorHandlers from './handlers/errorHandlers';
import path from 'path';

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../public')));

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

export default app;