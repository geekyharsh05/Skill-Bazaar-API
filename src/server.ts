import express from 'express';
import {
  userRouter,
  adminRouter,
  courseRouter,
  paymentRoute,
} from './routes/index.route';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnect } from './db/db.connect';

dotenv.config();
dbConnect();
const PORT = process.env.PORT ?? 4000;

declare global {
  namespace Express {
    interface Request {
      userId: string | undefined;
    }
  }
}

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);
app.use('/payment', paymentRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
