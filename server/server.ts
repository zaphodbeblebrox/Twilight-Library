import express, { Request, Response } from 'express';
import db from './config/database.config';

// db.authenticate();

db.sync().then(() => {
    console.log('connected to db');
});

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.send('jello world');
});

app.post('/create', (req: Request, res: Response) => {
    console.log(req.body);
    return res.send('jello world');
});

app.listen(port, () => {
    console.log('Twilight Library Server is running on port ' + port);
});

//------
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const socket = require("socket.io");
// app.use(cors());

// require("./config/mongoose-config");

// app.use(express.json(), express.urlencoded({ extended: true }));

// require("./routes/puzzleRoutes")(app);

// const port = 8000;
// const server = app.listen(port, () => console.log(`Necron Server is running on port ${port}!`));

// const io = socket(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["*"],
//         credentials: true,
//     },
// });

// const deepCopy = (obj) => {
//     if (obj === null || typeof obj !== "object") {
//         return obj;
//     }

//     if (Array.isArray(obj)) {
//         const arrCopy = [];
//         for (let i = 0; i < obj.length; i++) {
//             arrCopy[i] = deepCopy(obj[i]);
//         }
//         return arrCopy;
//     }

//     const objCopy = {};
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             objCopy[key] = deepCopy(obj[key]);
//         }
//     }
//     return objCopy;
// };

// const currentPuzzlesData = {};

// io.on("connection", (socket) => {
//     console.log("A new user connected with socket id: " + socket.id);
//     socket.on("update-dials", (puzzle, lighting, roomId) => {
//         // console.log(puzzle);
//         if (currentPuzzlesData[roomId]) {
//             currentPuzzlesData[roomId]["puzzle"] = deepCopy(puzzle);
//             currentPuzzlesData[roomId].lighting = { ...lighting };
//         } else {
//             currentPuzzlesData[roomId] = { puzzle: deepCopy(puzzle), lighting: { ...lighting } };
//             // console.log(currentPuzzlesData[roomId]);
//         }
//         // console.log("Copy: ", currentPuzzlesData[roomId].puzzle);
//         io.to(roomId).emit("execute-update", puzzle, lighting);
//     });

//     socket.on("load-lighting", (roomId) => {
//         if (currentPuzzlesData[roomId]) {
//             io.to(roomId).emit("load-current-lighting", currentPuzzlesData[roomId].lighting);
//         } else {
//             io.to(roomId).emit("load-default-lighting");
//         }
//     });

//     socket.on("join-room", (roomId) => {
//         socket.join(roomId);
//         if (currentPuzzlesData[roomId]) {
//             io.to(roomId).emit("load-current-dials", currentPuzzlesData[roomId].puzzle);
//         } else {
//             io.to(roomId).emit("load-default-dials");
//         }
//     });
// });
