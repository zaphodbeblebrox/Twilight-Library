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
// const port = process.env.PORT || 3000;
// import db from './models';

// db.sequelize.sync().then(() => {
//     app.listen(port, () => {
//         console.log(`KDM App listening on port ${port}.`);
//     });
// });
