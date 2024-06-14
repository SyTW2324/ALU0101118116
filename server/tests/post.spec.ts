import { describe } from 'mocha';
import { expect } from 'chai';

import { request, app } from './tests-setup';
import Post from '@src/schemas/post.schema';
import auth from '@src/middleware/auth';

let token: string;
before(async () => {
    const response = await request(app)
        .post('/sign-up')
        .send({
            username: "PostUser",
            first_name: "Test",
            last_name: "Post",
            email: "testpost@example.com",
            phone_number: "123456789",
            password: "password123"
        })
    token = response.body.token;
    await Post.create({
        author: "TestUser",
        title: "Test Post",
        content: "This is a test post",
        created_at: new Date()
    });
});

describe('Post API', () => {
    it ('should get all posts', async () => {
        const response = await request(app)
            .get('/posts')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body).to.be.an('array');
    });
    it('should get post by id', async () => {
        const post: any = await Post.findOne({ title: "Test Post" });
        const id = post!._id;
        const response = await request(app)
            .get(`/posts/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body.title).to.equal('Test Post');
        expect(response.body.content).to.equal('This is a test post');
    });
    it('should create a post', async () => {
        const response = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                author: "TestPost",
                title: "New Post",
                content: "This is a new post",
                created_at: new Date()
            })
            .expect(201);
        expect(response.body.title).to.equal('New Post');
        expect(response.body.content).to.equal('This is a new post');
    });

    it('should update a post', async () => {
        const post: any = await Post.findOne({ title: "New Post" });
        post!.title = 'Updated Post';
        post!.content = 'This is an updated post';
        const id = post!._id;
        await request(app)
            .patch(`/posts/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .expect(200);
    });
});
