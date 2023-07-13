import BaseController from "./base.controller";
import jwt from 'jsonwebtoken';
class AuthController extends BaseController {
    login() {
        const user = {
            name: "Codifin test user",
            id: "codifin-1"
        }
        const token = jwt.sign({
            name: user.name,
            id: user.id
        }, process.env.TOKEN_SECRET as string)

        this.res.send(token)
    }
    me() {
        this.res.status(200).json(this.req.user)
    }
}

export default AuthController;