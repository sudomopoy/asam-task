import { Document } from 'mongoose';
import UserModel, { IUser } from './../../models/userModel';

interface Response {
    // empty for now
}

interface DTO<T extends Document, R extends Response> {
    toModel(): T
    toResponse(): R
}
export class UserResponse implements Response {

}

// same should be in response
export class UserDTO implements DTO<IUser, UserResponse> {
    name: string;
    age: number;
    phoneNumber: string;
    constructor(data: any) {
        this.name = data?.name || null;
        this.age = data?.age || null;
        this.phoneNumber = data?.phoneNumber || null;
    }
    toModel(): IUser {
        return new UserModel(
           {
            name: this.name,
            phoneNumber: this.phoneNumber,
            age: this.age,
           }
        ) ;
    }
    toResponse(): UserResponse {
        // not imp
        return null
    }
    isValid(): boolean {
        if (!this.name && !this.age && !this.phoneNumber) return false
        return true
    }
}