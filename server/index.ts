import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to the kdm API!` });
});

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
} catch (error) {
    console.log(`Error occurred: ${error.message}`);
}
