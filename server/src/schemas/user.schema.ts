import { Schema, model } from 'mongoose';
import { UserInterface } from '@shared/interfaces/user.interface';

const UserSchema = new Schema<UserInterface>({
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    following: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

export default model<UserInterface>('User', UserSchema);
