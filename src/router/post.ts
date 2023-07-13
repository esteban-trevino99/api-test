import { Express, Response } from 'express';
import { ApiRequest } from '../types/general.types'

import PostController from '../controllers/post.controller';
import checkAuthMiddleware from '../utils/helpers/checkAuthMiddleware';

export default (app: Express) => {
    const prefix = '/posts'
    app.post(prefix,
        checkAuthMiddleware,
        (req: ApiRequest, res: Response) => new PostController(req, res).create()
    );
    app.get(prefix,
        checkAuthMiddleware,
        (req: ApiRequest, res: Response) => new PostController(req, res).get()
    )
    app.delete(prefix,
        checkAuthMiddleware,
        (req: ApiRequest, res: Response) => new PostController(req, res).delete())
}