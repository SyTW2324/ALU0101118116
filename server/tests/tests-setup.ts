import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '@src/main';

let mongoServer: MongoMemoryServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

export { request, app };
