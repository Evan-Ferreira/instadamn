export type Post = {
    firstName: string;
    lastName: string;
    username: string;
    likes: number;
    photo: string;
    id: number;
    caption?: string;
};

export type User = {
    firstName: string;
    lastName: string;
    username: string;
    profile_picture: string;
    bio: string;
    posts?: Post[];
};

export type Users = Record<string, User>;
