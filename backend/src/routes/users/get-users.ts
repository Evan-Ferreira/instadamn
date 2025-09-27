import { readJsonFile } from '../../utils/json';
import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
    res.send(readJsonFile('./src/db/users.json'));
};
