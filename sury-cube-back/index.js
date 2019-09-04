import express from 'express';
import http from 'http';

import db from './src/db';
import routers from './src/routes';
import logger from 'morgan';
import socket from './src/socket';
import { socketOn } from './src/socket/handler';

const app = express();
const server = http.createServer(app);

const io = socket(server);
socketOn(io);

db.defaults({
  rooms:[]
}).write();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routers);

server.listen(3000, () => {
  console.log('Server Listening..');
});
