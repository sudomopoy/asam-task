import { FastifyReply, FastifyRequest } from 'fastify';
import User, { IUser } from '../models/userModel';
import {UserDTO} from './dto/userRequest';

const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const userReq = new UserDTO(request.body);
    if (!userReq.isValid()){
        reply.code(400).send("body is not valid")
    }
    const user = userReq.toModel();

    try {
        await user.save();
        // shoudl use to response sto
        reply.code(201).send(user);
    } catch (error) {
        reply.code(500).send(error);
    }
};

const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // should use query dto
        const users = await User.find(request.query);
        reply.send(users);
    } catch (error) {
        reply.code(500).send(error);
    }
};

export { createUser, getUsers };
