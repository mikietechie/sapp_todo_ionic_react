import { createContext } from "react";

export interface IUserCTXUser {
    user: {};
}
export interface UserCtxType {
    user?: IUserCTXUser | null;
    setUser: (u: any) => void;
}

export const UserCtx = createContext<UserCtxType | null>(null)
