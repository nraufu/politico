import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import responseHandler from '../helpers/response';

dotenv.config();

export const verifyToken = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) return responseHandler(res, 400, {Error: "Please Provide a token"});
        const authorizedUser = jwt.verify(token, process.env.SECRET_KEY);
        req.authorizedUser = authorizedUser;
        next();
    } catch (error) {
        return responseHandler(res, 401, {Error: 'Token invalid or expired'});
    }
}
