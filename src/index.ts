import Fastify from 'fastify';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import fastifySwagger from 'fastify-swagger';


const fastify = Fastify({ logger: true });
// Configure the rate limiter 
//      fastify.register(require('fastify-rate-limit'), 
//      { max: 10, // max requests per user 
//         timeWindow: '1 minute',
//          keyGenerator: (req) => req.ip, 
//         });
// Use IP address as the key
mongoose.connect('mongodb://localhost:27017/userdb', {  })
    .then(() => fastify.log.info('MongoDB connected'))
    .catch(err => fastify.log.error(err));

fastify.register(userRoutes);

fastify.register(fastifySwagger, {
    routePrefix: '/swagger',
    swagger: {
        info: {
            title: 'User Management',
            description: 'API for managing users',
            version: '0.1.0'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    },
    exposeRoute: true
});

const start = async () => {
    try {
        await fastify.listen({port:3000});
        fastify.swagger();
        fastify.log.info(`Server listening on http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();


export default fastify;