export interface IToken {
    access: string;
    refresh: string;
}

export interface IUser {
    id: number;
    username: string;
    password?: string;
}