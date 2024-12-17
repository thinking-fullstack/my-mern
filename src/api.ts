import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from "http";
import cron from 'node-cron';

import { PORT, DB_URL, CORS_ORIGINS } from './config';
import router from './routes';
import {setupSocket} from "./socket/setupSocket";

mongoose
  .connect(`${DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to DB ${DB_URL}`);
  });

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

const cronTask = cron.schedule('* * * * 1', () => {
  console.log('cron job is running');
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`✅  Ready http server on port http://localhost:${PORT}`)
  cronTask.start();
});

setupSocket(httpServer).then((res) => {
  console.log(`✅  Ready socket server on port ws://localhost:${PORT}`)
});