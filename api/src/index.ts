import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './routes/users';
import docsRoute from './routes/docs';
import servicesRoute from './routes/services';

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 8800;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Route handling
app.use('/api/users', userRoute);
app.use('/api/docs', docsRoute);
app.use('/api/services', servicesRoute);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running and connected to the PostgreSQL database.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is successfully running at http://localhost:${port}`);
});
