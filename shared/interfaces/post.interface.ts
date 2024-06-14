export interface PostInterface {
    author: string;
    title: string;
    content: string;
    featured_image?: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
