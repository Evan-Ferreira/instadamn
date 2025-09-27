import { readJsonFile, writeJsonFile } from '../../utils/json';
import { Request, Response } from 'express';
import { Post } from '../../utils/types';

export const patchUserPost = (req: Request, res: Response) => {
    const { username, id } = req.params;
    const { action } = req.body;
    const users = readJsonFile('./src/db/users.json');
    users[username]['posts'].forEach((post: Post) => {
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
        data: users[username]['posts'].find(
            (post: Post) => post.id === Number(id)
        ),
    });
};
