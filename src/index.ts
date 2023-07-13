import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './router'
import Database from './config/database';
dotenv.config();

import bodyparser from 'body-parser'


const app: Express = express();
const port = process.env.PORT;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

router(app)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});