import { createContext } from "react";

export interface IAuthCTXToken {
    access: string;
    refresh: string;
}

export interface IAuthCTXUser {
    all_permissions: string[];
    email: string | null;
    first_name: string | null;
    id: number;
    initials_picture_url: string;
    is_staff: boolean;
    is_superuser: boolean;
    last_name: string | null;
    phone: string | null;
    role: string | null;
    token?: IAuthCTXToken;
    username: string | null;
}
export interface AuthCtxType {
    user?: IAuthCTXUser | null;
    setUser: (u: any) => void;
    logout: () => void;
}

export const AuthCtx = createContext<AuthCtxType | null>(null)
