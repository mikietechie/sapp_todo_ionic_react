import axios from "axios"
import { apiUrl, getAxiosConf } from "./common"

export const datefyJSON = (date: string) => new Date(date)

export const fmtDateTime = (date: Date | string) => new Intl.DateTimeFormat("en-GB", {dateStyle: "medium", timeStyle: "short"}).format(new Date(date))
export const fmtDate = (date: Date | string) => new Intl.DateTimeFormat("en-GB", {dateStyle: "medium"}).format(new Date(date))
export const fmtDateJSON = (date: Date | string) => (new Date(date)).toJSON().slice(0, 10)

export const sortBy = <T>(array: T[], v: string, o: 1|-1 = 1)  => array.sort((i1, i2) => ((i1 as any)[v] > (i2 as any)[v] ? 1 : -1) * o)

export interface IList {
    id: number;
    name: string;
    desc?: string;
    icon?: string;
    default: boolean;
}

export interface IItem {
    id: number;
    subject: string;
    done: boolean;
    important: boolean;
    date: string | null;
    priority: "Highest" | "High" | "Medium" | "Low" | "Lowest";
    creation_timestamp: string;
    edit_timestamp: string;
    details: string | null;
}

export const getLists = async () => (await axios.get(`${apiUrl}list/sapp_todo/list/`, getAxiosConf())).data.page as IList[]
export const getList = async (id: number|string) => ((await axios.get(`${apiUrl}detail/sapp_todo/list/${id}/`, getAxiosConf())).data as {instance: IList})
export const getDefaultList = async () => ((await axios.get(`${apiUrl}list/sapp_todo/list/?default=True&submit=Apply`, getAxiosConf())).data.page as IList[]).at(0)
export const getItems = async (qs: string = "") => (await axios.get(`${apiUrl}list/sapp_todo/item/${qs}`, getAxiosConf())).data.page as IItem[]
export const getSortedItems = async (qs: string = "") => sortBy(await (await axios.get(`${apiUrl}list/sapp_todo/item/${qs}`, getAxiosConf())).data.page as IItem[], "edit_timestamp", -1)
export const updateAttr = async (model: string, id: string|number, attr: string, value: any) => (await axios.post(`${apiUrl}method/sapp_todo/${model}/update_attr/`, {id, attr, value}, getAxiosConf())).data
