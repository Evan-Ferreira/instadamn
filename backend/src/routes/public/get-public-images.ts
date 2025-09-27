import express from 'express';

export const getPublicImages = express.static('src/public/images', {
    dotfiles: 'deny',
    index: false,
    redirect: false,
    setHeaders: (res, path) => {
        if (!path.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            res.status(403).end('Forbidden');
            return;
        }
    },
});
