import { describe } from 'mocha';
import { expect } from 'chai';

import { request, app } from './tests-setup';
import User from '@src/schemas/user.schema';

let token: string;

describe('Sign Up API', () => {
    it('should sign up a new user', async () => {
        const response = await request(app)
            .post('/sign-up')
            .send({
                username: "Jhonny",
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                phone_number: "123456789",
                password: "password123"
            })
            .expect(201);
        token = response.body.token;
        const user = await User.findOne({ username: "Jhonny" });
        expect(user).to.not.be.null;
        expect(user!.username).to.equal('Jhonny');
        expect(user!.first_name).to.equal('John');
        expect(user!.last_name).to.equal('Doe');
        expect(user!.email).to.equal('john.doe@example.com');
        expect(user!.phone_number).to.equal('123456789');
    });

    it('should not sign up a new user with the same email', async () => {
        await request(app)
            .post('/sign-up')
            .send({
                username: "Jhonny",
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                phone_number: "123456789",
                password: "password123"
            })
            .expect(409);
    });
});

describe('Sign In API', () => {
    it('should sign in a user', async () => {
        const response = await request(app)
            .post('/sign-in')
            .send({
                email: "john.doe@example.com",
                password: "password123"
            })
            .expect(200);
        token = response.body.token;
        const user = await User.findOne({ email: "john.doe@example.com" });
        expect(user).to.not.be.null;
        expect(user!.username).to.equal('Jhonny');
        expect(user!.first_name).to.equal('John');
        expect(user!.last_name).to.equal('Doe');
        expect(user!.email).to.equal('john.doe@example.com');
        expect(user!.phone_number).to.equal('123456789');
    });

    it('should not sign in a user with the wrong password', async () => {
        await request(app)
            .post('/sign-in')
            .send({
                email: "john.doe@example.com",
                password: "password"
            })
            .expect(401);
    });
});
