import { Response } from 'express';
import { ApiRequest } from '../types/general.types';
class BaseController {
    req: ApiRequest;
    res: Response;
    constructor(req: ApiRequest, res: Response) {
        this.req = req;
        this.res = res;
    }
}

export default BaseController;