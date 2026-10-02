import express, { urlencoded } from 'express';
import urlRouter from './routes/url_router.js';
import connectToMongoDb from './connect.js';
import restrictToLoggedInUser from './middlewares/auth.js';
import UserRouter from './routes/user_router.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', UserRouter);
app.use(restrictToLoggedInUser);
app.use('/url', urlRouter);
await connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('Mongo DB connected successfully'))
    .catch((err) => console.log('Mongo err', err));

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));