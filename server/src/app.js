'use strict';

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport.js';
import routes from './routes/index.route.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();

app.use(cors({
  // Browsers will only let js from that origin read responses
  origin: 'http://localhost:5173', 
  optionsSuccessState: 200,
  // Inform client that credentials should be sent with requests
  credentials: true, 
}));

app.use(express.json());
app.use(session({
  secret: 'app',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', routes);

app.use(errorHandler);

export default app;