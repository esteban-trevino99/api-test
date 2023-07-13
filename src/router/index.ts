import { Express } from 'express';
import AuthRouter from './auth';
import PostRouter from './post'

export default (app: Express) => {
    AuthRouter(app)
    PostRouter(app)
}