export interface UserInterface {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    profileImage: string;
    following?: string[];
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
