import axios, { AxiosRequestConfig } from "axios"
import { IAddEditResponseData, IDetailResponseData, IForm, IListResponseData } from "../structs/api"
import { IToken, IUser } from "../structs/auth"
import { getAxiosConf } from "../functions/api"
import { apiUrl, serverUrl } from "../data/conf"

export class SappService {
    /**
     * update field
     */
    public static async updateField (module: string, model: string, id: string|number, field: string, value: any) {
        return (
            await axios.post(`${apiUrl}/method/${module}/${model}/update_field/`, {id, field, value}, getAxiosConf())
        ).data
    }

    /**
     * delete instance
     */
    public static async deleteInstance (module: string, model: string, id: number) {
        return (
            await axios.get(`${apiUrl}/delete/${module}/${model}/${id}/`, getAxiosConf())
        ).data
    }

    /**
     * get instance
     */
    public static async detailInstance <T>(module: string, model: string, id: number) {
        return (
            await axios.get(`${apiUrl}/detail/${module}/${model}/${id}/`, getAxiosConf())
        ).data as IDetailResponseData<T>
    }

    /**
     * get instances
     */
    public static async listInstances <T>(module: string, model: string, queryString: string = "") {
        return (
            await axios.get(`${apiUrl}/list/${module}/${model}/${queryString}`, getAxiosConf())
        ).data as IListResponseData<T>
    }

    /**
     * post instances
     */
    public static async createEditInstance (module: string, model: string, data:any=null, id:number = 0, queryString: string = "") {
        const action = id ? "edit" : "add"
        const url = `${apiUrl}/${action}/${module}/${model}/${id && `${id}/` || ''}${queryString}`
        const conf = getAxiosConf()
        return (
            await (data ? axios.post(url, data, conf) : axios.get(url, conf))
        ).data as IAddEditResponseData
    }

    /**
     * login
     */
    public static async login (data:any) {
        return (await axios.post(`${serverUrl}/auth/api/login/`, data)).data as IToken & {detail: string}
    }

    /**
     * register
     */
    public static async register (data:any) {
        return (await axios.post(`${serverUrl}/auth/api/register/`, data)).data as IUser & {form: IForm}
    }

    /** Get Session User */
    public static async getSessionUser (headers?: AxiosRequestConfig) {
        return (await axios.get(`${serverUrl}/auth/api/session/`, headers || getAxiosConf())).data as IUser
    }

    
}