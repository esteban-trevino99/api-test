import { Express, Response } from 'express';
import { ApiRequest } from '../types/general.types'

import AuthController from '../controllers/auth.controller';
import checkAuthMiddleware from '../utils/helpers/checkAuthMiddleware';

export default (app: Express) => {
    const prefix = '/auth'
    app.post(prefix,
        (req: ApiRequest, res: Response) => new AuthController(req, res).login()
    );
    app.get(prefix,
        checkAuthMiddleware,
        (req: ApiRequest, res: Response) => new AuthController(req, res).me()
    )
}