import express from 'express';
import { requestLogger } from './middleware/request-logger';
import cors from 'cors';
import { readJsonFile, writeJsonFile } from './utils/json';
import { Post } from './utils/types';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(
    '/public/images',
    express.static('src/public/images', {
        dotfiles: 'deny',
        index: false,
        redirect: false,
        setHeaders: (res, path) => {
            if (!path.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
                res.status(403).end('Forbidden');
                return;
            }
        },
    })
);

app.get('/users', (req, res) => {
    res.send(readJsonFile('./src/db/users.json'));
});

app.get('/users/:username', (req, res) => {
    const { username } = req.params;
    const users = readJsonFile('./src/db/users.json');
    const posts = users[username];
    res.send(posts);
});

app.patch('/users/:username/posts/:id', (req, res) => {
    const { username, id } = req.params;
    const { action } = req.body;
    const users = readJsonFile('./src/db/users.json');
    users[username].forEach((post: Post) => {
        if (post.id === Number(id)) {
            if (action === 'like') {
                post.likes++;
            } else if (action === 'unlike') {
                post.likes--;
            }
        }
    });
    writeJsonFile('./src/db/users.json', users);
    res.send({
        success: true,
        data: users[username].find((post: Post) => post.id === Number(id)),
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
