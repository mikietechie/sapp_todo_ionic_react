import { isPlatform } from "@ionic/react";
import { AxiosRequestConfig } from "axios";

export const serverURL = `http://${isPlatform("android") ? '10.0.2.2':  'localhost'}:8000/`
export const apiUrl = `${serverURL}space/api/`
