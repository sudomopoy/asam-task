import { FastifyInstance } from 'fastify';
import { createUser, getUsers } from '../controllers/userController';

async function routes(fastify: FastifyInstance, options: any) {
    fastify.post('/users', createUser);

    fastify.get('/users', {
        schema: {
            querystring: {
                age: { type: 'number' },
                name: { type: 'string' }
            }
        }
    }, getUsers);
}

export default routes;
