import * as express from 'express';
import * as bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import User from "@schemas/user.schema.js";

export const signInRouter = express.Router();

signInRouter.use(express.json());

signInRouter.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    if (user.password !== password)
        return res.status(401).json({ message: 'Invalid password' });

    const id = user._id;
    const token = jwt.sign({ id }, 'secret', { expiresIn: '30d' });
    return res.status(200).json({ token });
});
