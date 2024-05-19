import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
