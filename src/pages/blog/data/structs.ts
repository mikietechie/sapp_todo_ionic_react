export interface ICategory {
    id: number;
    name: string;
    image: string;
    header: string;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
}

export interface IAuthor {
    id: number;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
    user: number;
    full_name: string;
    image: string;
    about: string;
    categories: number[];
}

export interface IPost {
    id: number;
    title: string;
    image: string;
    category: number;
    author: number | null;
    published: boolean,
    reads: number;
    body: string;
    keywords: string;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
}

export interface IComment {
    id: number;
    text: string;
    post: number;
    comment: number | null;
    creation_timestamp: string;
    edit_timestamp: string;
    created_by: number;
    updated_by: number;
}