import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import connectToMongoDB from '@db/mongoose.js';

import { signInRouter } from '@routers/auth/sign-in.router.js';
import { signUpRouter } from '@routers/auth/sign-up.router.js';

import { userRouter } from '@routers/user.router.js';
import { postRouter } from '@routers/post.router.js';

dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsPath))
    fs.mkdirSync(uploadsPath);

export const app = express();

app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/uploads', (req, res, next) => {
    next();
}, express.static(uploadsPath));
app.use(cors());
app.use(signInRouter);
app.use(signUpRouter);
app.use(userRouter);
app.use(postRouter);

if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3000;
    await app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    connectToMongoDB();
}
