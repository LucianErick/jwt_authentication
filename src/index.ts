import 'reflect-metadata'
import express, { RequestHandler } from 'express';
import routes from './routes';
import "./database/connect"

const app = express();
app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log("Server is running at http://localhost:3000 !"));