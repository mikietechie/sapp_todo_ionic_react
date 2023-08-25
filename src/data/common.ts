import { AxiosRequestConfig } from "axios";

export const serverURL = "http://localhost:8000/"
export const apiUrl = `${serverURL}space/api/`
export const getAxiosConf = () => JSON.parse(localStorage.getItem("headers")||"{}") as AxiosRequestConfig
