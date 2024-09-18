import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import userRoute from './routes/users';
import docsRoute from './routes/docs';

dotenv.config();

const app = express();
const port = process.env.PORT || 8800;


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware setup
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoute);
app.use('/api/docs', docsRoute);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running and connected to the PostgreSQL database.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is successfully running at http://localhost:${port}`);
});
