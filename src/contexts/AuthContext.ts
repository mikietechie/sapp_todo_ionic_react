import { createContext } from "react";
import { IToken, IUser } from "../data/auth";

export interface AuthContextType {
    token?: IToken;
    user?: IUser;
    loadUser: () => Promise<void>;
    setUser: (u: IUser | undefined) => void;
    setToken: (t: IToken | undefined) => void;
    clearToken: () => void;
    headers?: {headers: {Authorization: string}}
}

export const AuthContext = createContext<AuthContextType | null>(null)
