import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/', routes);

app.use((req, res, next) => {
  const error = new Error('Method not allowed');
  error.status = 405;
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: error.status || 500, error: error.message });
  next();
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export default server;
