import { Response, NextFunction } from 'express';
import { ApiRequest } from '../../types/general.types';
import jwt from 'jsonwebtoken';

const checkAuthMiddleware = (req: ApiRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ error: 'access denied' })
    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET as string)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ error: 'invalid token' })
    }
}

export default checkAuthMiddleware;