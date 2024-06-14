import * as express from 'express';
import * as bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import User from "@schemas/user.schema.js";

export const signUpRouter = express.Router();

signUpRouter.use(express.json());

signUpRouter.post('/sign-up', async (req, res) => {
    const body = req.body;
    const user = new User({ username: body.username, first_name: body.first_name, last_name: body.last_name, email: body.email, phone_number: body.phone_number, password: body.password });
    await user.save().then((user) => {
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const id = user._id;
        const token = jwt.sign({ id }, 'secret', { expiresIn: '30d' });
        return res.status(201).json({ token, id });
    }).catch((err) => {
        if (err.code === 11000)
            return res.status(409).json({ message: 'There is already a registered user with this email' });
        return res.status(500).json({ message: err });
    });
});
