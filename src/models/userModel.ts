import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    phoneNumber:string;
    age: number;
}
const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // Index on name field for faster searching
        index: true
    },
    email: {
        type: String,
        // Unique email
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        // Unique index on phoneNumber field to ensure uniqueness
        index: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
});

export default mongoose.model<IUser>('User', userSchema);
