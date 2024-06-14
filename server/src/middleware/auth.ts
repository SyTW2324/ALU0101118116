import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends Request {
    user?: string;
}

export default function auth(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");
    if (!authHeader)
        return res.status(401).send("Access denied. No token provided.");
    const jwtToken = authHeader.split(' ')[1];

    if (!jwtToken)
        return res.status(401).send("Access denied. Invalid token.");

    try {
        req.user = jwt.verify(jwtToken, process.env.JWT_SECRET || "secret") as string;
        next();
    } catch (err) {
        res.status(401).send("Access denied. Invalid token.");
    }
}
