import http from 'http';
import express from 'express';


const port = 5000;
const app = express();

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello mudila!')
// })

// server.listen(port, host, () => {
//     console.log(`Server run to ${host}:${port}`);
// })

app.get('/hello', (req, res) => {
    res.send('Hello mudila it is Express')
})

app.listen(port, () => {
    console.log(`Server run to port - ${port}`);
})

