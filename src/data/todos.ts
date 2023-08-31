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

export interface IStep {
    id: number;
    title: string;
    done: boolean;
    item: number;
}

// axios.post(`${apiUrl}add/sapp_todo/list/`, {name: "Main List", default: true}, getAxiosConf())
export const getLists = async () => (await axios.get(`${apiUrl}list/sapp_todo/list/`, getAxiosConf())).data.page as IList[]
export const getList = async (id: number|string) => ((await axios.get(`${apiUrl}detail/sapp_todo/list/${id}/`, getAxiosConf())).data as {instance: IList})

export const getDefaultList = async (): Promise<IList> => {
    const defaultList = ((await axios.get(`${apiUrl}list/sapp_todo/list/?default=True&submit=Apply`, getAxiosConf())).data.page as IList[]).at(0)
    if (!defaultList) {
        await axios.post(`${apiUrl}add/sapp_todo/list/`, {name: "First", default: true}, getAxiosConf())
        return await getDefaultList()
    }
    return defaultList
}

export const getItems = async (qs: string = "") => (await axios.get(`${apiUrl}list/sapp_todo/item/${qs}`, getAxiosConf())).data.page as IItem[]
export const getSortedItems = async (qs: string = "") => sortBy(await (await axios.get(`${apiUrl}list/sapp_todo/item/${qs}`, getAxiosConf())).data.page as IItem[], "edit_timestamp", -1)

export const updateAttr = async (model: string, id: string|number, attr: string, value: any) => (
    await axios.post(`${apiUrl}method/sapp_todo/${model}/update_field/`, {id, attr, value}, getAxiosConf())
).data

interface IModel {
    name: string;
    app_label: string;
    icon: string;
}

export interface WidgetAtts {
    maxlength: string
  }

interface IFormField  {
  field: string
  label: string
  value: string | number | null
  widget_atts: WidgetAtts
  required: boolean
  widget: "NumberInput" | "DateInput" | "Select" | "TextInput" | "TinyMCE"
  css_class: string
  type: string
  errors: any
  choices: null | [number|string, string][]
}

interface IFieldError {
    message: string
    code: string
}

interface IFormAttrs {
    string: string
}

interface IForm {
    fields: {string: IFormField}
    errors: {string: IFieldError[]}
    attrs: IFormAttrs
}


interface IListResponseData <T> {
    count: number;
    page: T[];
}

interface IAddEditResponseData {
    id?: number;
    form?: IForm;
    model?: IModel
}

export class TodoService {
    /**
     * update field
     */
    public static async updateField (module: string, model: string, id: string|number, field: string, value: any) {
        return (
            await axios.post(`${apiUrl}method/${module}/${model}/update_field/`, {id, field, value}, getAxiosConf())
        ).data
    }

    /**
     * delete instance
     */
    public static async deleteInstance (module: string, model: string, id: number) {
        return (
            await axios.get(`${apiUrl}delete/${module}/${model}/${id}/`, getAxiosConf())
        ).data
    }

    /**
     * get instance
     */
    public static async detailInstance <T>(module: string, model: string, id: number) {
        return (
            await axios.get(`${apiUrl}details/${module}/${model}/${id}/`, getAxiosConf())
        ).data as T
    }

    /**
     * get instances
     */
    public static async listInstances <T>(module: string, model: string, queryString: string = "") {
        return (
            await axios.get(`${apiUrl}list/${module}/${model}/${queryString}`, getAxiosConf())
        ).data as IListResponseData<T>
    }

    /**
     * post instances
     */
    public static async createEditInstance (module: string, model: string, data:any=null, id:number = 0, queryString: string = "") {
        const action = id ? "edit" : "add"
        const url = `${apiUrl}${action}/${module}/${model}/${id && `${id}/` || ''}${queryString}`
        const conf = getAxiosConf()
        return (
            await (data ? axios.post(url, data, conf) : axios.get(url, conf))
        ).data as IAddEditResponseData
    }
}