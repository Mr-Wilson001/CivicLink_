import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: string | jwt.JwtPayload;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send('Access Denied');
        return;
    }
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = verified;
        next();
    } catch {
        res.status(400).send('Invalid Token');
    }
};
