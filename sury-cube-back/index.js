import express from 'express';
import text from './src/hello';

const app = express();

app.listen(3000, () => {
    console.log('Server Listening... ' + text.text);
});
