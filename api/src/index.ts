import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './routes/users';
import docsRoute from './routes/docs';

dotenv.config();

const app = express();
const port = process.env.PORT || 8800;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoute);
app.use('/api/docs', docsRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running and connected to the PostgreSQL database.');
});

app.listen(port, () => {
  console.log(`Server is successfully running at http://localhost:${port}`);
});
