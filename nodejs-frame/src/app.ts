import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import post_route from './routes/post_route';
import auth_route from './routes/auth_route';
import passport from 'passport';
import bodyParser from 'body-parser';
import error from './middlewares/error';
import cors from 'cors';
import * as swaggerUI from 'swagger-ui-express';
import * as YAML from 'yamljs';

dotenv.config();

const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load('./swagger/api.yaml');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
require('./config/passport');

mongoose
  .connect(process.env.DATABASE || "")
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.use('/api/posts', passport.authenticate('jwt', { session: false }), post_route);
    app.use("/api", auth_route);
    app.use(error);
  })