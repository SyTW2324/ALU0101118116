import * as express from 'express';
import * as bodyParser from 'body-parser';

import auth from "@middleware/auth.js";

import User from '@schemas/user.schema.js';
import Post from '@schemas/post.schema.js';

export const postRouter = express.Router();

postRouter.use(express.json());

postRouter.get('/posts', auth, async (_, res) => {
    try {
        await Post.find().then((posts) => {
            if (!posts)
                return res.status(404).send('No posts found');
            posts.sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            return res.status(200).send(posts);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

postRouter.get('/posts/:id', auth, async (req, res) => {
    try {
        await Post.findById(req.params.id).then((post) => {
            if (!post)
                return res.status(404).send('Post not found');
            return res.status(200).send(post);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

postRouter.post('/posts', auth, async (req, res) => {
    try {
        await Post.create(req.body).then((post) => {
            return res.status(201).send(post);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

postRouter.delete('/posts/:id', auth, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id).then((post) => {
            if (!post)
                return res.status(404).send('Post not found');
            return res.status(200).send(post);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

postRouter.patch('/posts/:id', auth, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body).then((post) => {
            if (!post)
                return res.status(404).send('Post not found');
            return res.status(200).send(post);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

postRouter.get('/feed', auth, async (req, res) => {
    try {
        const { users } = req.query;
        const posts = await Post.find({ author: { $in: users } });

        if (!posts.length) {
            return res.status(404).send('No posts found');
        }

        posts.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        return res.status(200).send(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});
