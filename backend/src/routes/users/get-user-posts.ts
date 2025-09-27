import { readJsonFile } from '../../utils/json';
import { Request, Response } from 'express';

export const getUserPosts = (req: Request, res: Response) => {
    const { username } = req.params;
    const users = readJsonFile('./src/db/users.json');
    const posts = users[username]['posts'];
    res.send(posts);
};
