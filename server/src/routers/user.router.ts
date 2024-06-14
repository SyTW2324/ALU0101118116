import * as express from "express";
import * as bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

import auth from "@middleware/auth.js";

import User from "@schemas/user.schema.js";
import Post from "@schemas/post.schema.js";

export const userRouter = express.Router();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsPath = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        const dir = uploadsPath;
        fs.access(dir, fs.constants.W_OK, (err) => {
            if (err) {
                fs.mkdir(dir, { recursive: true }, (err) => {
                    if (err)
                        console.log(err);
                    cb(null, dir);
                });
            } else {
                cb(null, dir);
            }
        });
    },
    filename: function (_, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });

userRouter.use(express.json());

userRouter.get("/users", auth, async (_, res) => {
    try {
        await User.find().then((users) => {
            if (!users)
                return res.status(404).send("No users found");
            users.sort((a, b) => a.username.localeCompare(b.username));
            return res.status(200).send(users);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
        });
    } catch (err) {
        res.status(500).send("Internal server error");
    }
});

userRouter.get("/users/:id", auth, async (req, res) => {
    try {
        await User.findById(req.params.id).then((user) => {
            if (!user)
                return res.status(404).send("User not found");
            return res.status(200).send(user);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

userRouter.get("/users/username/:username", auth, async (req, res) => {
    try {
        await User.findOne({ username: req.params.username }).then(async (user) => {
            if (!user)
                return res.status(404).send("User not found");
            let user_posts: any;
            await Post.find({ author: user.username }).then((posts) => {
                user_posts = posts;
            }).catch((err) => {
                console.log(err);
                return res.status(500).send("Internal server error");
            });
            return res.status(200).send({ username: user.username, first_name: user.first_name, last_name: user.last_name, posts: user_posts, following: user.following, created_at: user.created_at, profileImage: user.profileImage });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

userRouter.delete("/users/:id", auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id).then((user) => {
            if (!user)
                return res.status(404).send("User not found");
            return res.status(200).send(user);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

userRouter.patch("/users/:id", auth, upload.single('file'), async (req, res) => {
    try {
        let data = req.body;
        data.profileImage = req.file ? `/uploads/${req.file.filename}` : data.profileImage;
        data.updated_at = new Date().toISOString();
        if (data.following === '')
            data.following = [];
        else if (Array.isArray(data.following))
            data.following = data.following.filter((user: string) => user !== '');
        await User.findByIdAndUpdate
            (req.params.id, data
                , { new: true, runValidators: true }).then((user) => {
                    if (!user)
                        return res.status(404).send("User not found");
                    return res.status(200).send(user);
                }).catch((err) => {
                    console.log(err);
                    return res.status(500).send("Internal server error");
                });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});
