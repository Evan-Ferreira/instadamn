import express from 'express';
import { getPublicImages } from './get-public-images';

const publicRouter = express.Router();

export const getPublicRouter = () => {
    publicRouter.use('/images', getPublicImages);

    return publicRouter;
};
