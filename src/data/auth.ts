import axios from "axios";
import { getAxiosConf, serverURL } from "./common";

export interface IToken {
    access: string;
    refresh: string;
}

export interface IUser {
    id: number;
    username: string;
    password?: string;
}

export const getSessionUser = async () => (await axios.get(`${serverURL}auth/api/session/`, getAxiosConf())).data as IUser
