import express from 'express';
import { requestLogger } from './middleware/request-logger';
import cors from 'cors';
import { getUserRouter } from './routes/users';
import { getPublicRouter } from './routes/public';

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// endpoints
app.use('/public', getPublicRouter());
app.use('/users', getUserRouter());

// run server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
