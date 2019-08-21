import express from 'express';
import db from './src/db';
import routers from './src/routes';
import logger from 'morgan';

const app = express();

db.defaults({
    room:[]
}).write();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routers);

app.listen(3000, () => {
    console.log('Server Listening... ');
});
