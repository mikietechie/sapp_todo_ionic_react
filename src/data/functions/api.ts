import { AxiosRequestConfig } from "axios"

export const getAxiosConf = ():AxiosRequestConfig => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return {headers: {Authorization: `Bearer ${user?.token?.access}`}}
}
