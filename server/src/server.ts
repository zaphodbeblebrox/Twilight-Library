import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import settlementRoutes from './routes/settlementRoutes';
import survivorRoutes from './routes/survivorRoutes';

const router = express();

// Connect to MongoDB
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('KDM Database Connected');
        Logging.info('KDM Database Connected');
        StartServer();
    })
    .catch((error) => {
        console.log(error);
        Logging.error('Unable to Connect to KDM: ');
        Logging.error(error);
    });

/* Only start the server if Mongo connects */
const StartServer = () => {
    router.use((req, res, next) => {
        // Log request
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            //Log response
            Logging.info(
                `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`,
            );
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // Rules of our API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Resquest-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    /* Routes */
    router.use('/settlements', settlementRoutes);
    router.use('/survivors', survivorRoutes);

    /* Health check */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /* Error Handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () =>
        Logging.info(`Twilight Library Server is running on port ${config.server.port}.`),
    );
};
