import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { userRouter } from './routes/user';
import { productRouter } from './routes/product';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(productRouter);

mongoose
  .connect(process.env.MONGODB_URL || '', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo running'))
  .catch(e => console.log(e));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
