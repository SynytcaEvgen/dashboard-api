import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users';


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

// const sayHellow = (req, res, next) => {
//     res.send('Hello mudila it is Express')
// };

// const sayBye = (req, res, next) => {
//     res.send('Bye mudila it is Express')
// };

// app.route('/user')
//     .get(sayHellow)
//     .post(sayBye)

app.use((req, res, next) => {
    console.log(`Time now ${Date.now()}`);
    next();
})

app.get('/hello', (req, res) => {
    res.send({
        status: true,
    })
})

app.use('/users', userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(401).send(err.message);
})

app.listen(port, () => {
    console.log(`Server run to port - ${port}`);
})

