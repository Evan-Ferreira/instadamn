import express from 'express';
import { getUsers } from './get-users';
import { getUserPosts } from './get-user-posts';
import { patchUserPost } from './patch-user-post';

const usersRouter = express.Router();

export const getUserRouter = () => {
    usersRouter.get('/', getUsers);
    usersRouter.get('/:username/posts', getUserPosts);
    usersRouter.patch('/:username/posts/:id', patchUserPost);

    return usersRouter;
};
