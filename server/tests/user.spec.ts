import { describe } from 'mocha';
import { expect } from 'chai';

import { request, app } from './tests-setup';
import { UserInterface } from '@shared/interfaces/user.interface';
import User from '@schemas/user.schema';
import mongoose from 'mongoose';

let token: string;

before(async () => {
    const response = await request(app)
        .post('/sign-up')
        .send({
            username: "TestUser",
            first_name: "Test",
            last_name: "User",
            email: "test@example.com",
            phone_number: "123456789",
            password: "password123"
        })
    token = response.body.token;
});

describe('User API', () => {
    it ('should get all users', async () => {
        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body).to.be.an('array');
    });
    it('should get user information by id', async () => {
        const user: any = await User.findOne({ username: "TestUser" });
        const id = user!._id;
        const response = await request(app)
            .get(`/users/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body.username).to.equal('TestUser');
        expect(response.body.first_name).to.equal('Test');
        expect(response.body.last_name).to.equal('User');
    });
    it('should get user information by username', async () => {
        const response = await request(app)
            .get('/users/username/Jhonny')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body.username).to.equal('Jhonny');
        expect(response.body.first_name).to.equal('John');
        expect(response.body.last_name).to.equal('Doe');
    });
    it('should update user information', async () => {
        const user: any = await User.findOne({ username: "TestUser" });
        user!.first_name = 'Johnny';
        user!.last_name = 'Doe';
        const id = user!._id;
        const response = await request(app)
            .patch(`/users/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(user)
        expect(response.body.username).to.equal('TestUser');
        expect(response.body.first_name).to.equal('Johnny');
        expect(response.body.last_name).to.equal('Doe');
    });
    it('should delete user', async () => {
        const user: any = await User.findOne({ username: "TestUser" });
        const id = user!._id;
        const response = await request(app)
            .delete(`/users/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body.username).to.equal('TestUser');
        expect(response.body.first_name).to.equal('Johnny');
        expect(response.body.last_name).to.equal('Doe');
    });
    it('should not delete non-existing user', async () => {
        const id = new mongoose.Types.ObjectId();
        const response = await request(app)
            .delete(`/users/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
        expect(response.text).to.equal('User not found');
    });
});
