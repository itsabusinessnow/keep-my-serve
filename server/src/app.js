import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import passportSetup from './auth/passport-setup';
import routes from './routes';
import errorHandlers from './handlers/errorHandlers';

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../public')));

// initalize passport
app.use(passport.initialize());

app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

// After allllll that above middleware, we finally handle our own routes!
app.use('/api/v1', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

export default app;
