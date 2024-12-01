import request from 'supertest';
import fastify from '../src/index';
import mongoose from 'mongoose';

describe('User API', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/userdb-test', { });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a user', async () => {
        const res = await request(fastify.server)
            .post('/users')
            .send({ name: 'mopoy', email: 'mopoy.code@gmail.com', age: 22 });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('mopoy');
    });

    it('should get users', async () => {
        const res = await request(fastify.server).get('/users');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
