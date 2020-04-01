import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import Database from './database';
import { routes as userRoutes } from './controllers/user';
import { routes as expenseRoutes } from './controllers/expense';

export default class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
        this.database = new Database(this.config.mongoUrl)
    }

    bootStrap() {
        this.setUpRoutes();
        return this;
    }

    async run() {
        this.connectDb()
        .then(() => {
            this.listen();
        });
    }

    async connectDb() {
        return this.database.open();
    }

    setUpRoutes() {
        // parse application/x-www-form-urlencoded
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
 
        // parse application/json
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, '../../client/build')));
        this.app.use('/user', userRoutes);
        this.app.use('/expense', expenseRoutes);
        this.app.get('/health-check', (req, res) => (res.send('I am ok')));
        this.app.get('*', (req, res) => {  res.sendFile(path.join(__dirname, '../../client/build/index.html'))})
    }

    listen() {
        this.app.listen(this.config.port, () => console.log(`App is running at server ${this.config.port}!`));
    }
}