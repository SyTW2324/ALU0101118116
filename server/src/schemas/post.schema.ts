import { Schema, model } from 'mongoose';
import { PostInterface } from '@shared/interfaces/post.interface';

const PostSchema = new Schema<PostInterface>({
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    featured_image: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

export default model<PostInterface>('Post', PostSchema);
