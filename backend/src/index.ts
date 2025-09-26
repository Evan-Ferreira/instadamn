import express from 'express';
import { requestLogger } from './middleware/request-logger';
import cors from 'cors';
import { readJsonFile } from './utils/json';

const app = express();
const port = 3000;

app.use(cors());
app.use(requestLogger);

app.get('/users', (req, res) => {
    res.send(readJsonFile('./src/db/users.json'));
});

app.get('/users/:username', (req, res) => {
    const { username } = req.params;
    const users = readJsonFile('./src/db/users.json');
    const posts = users[username];
    res.send(posts);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
