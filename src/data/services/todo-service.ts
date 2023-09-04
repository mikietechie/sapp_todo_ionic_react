import { SappService } from "./sapp-service";
import { IItem, IList } from "../structs/todo";
import { sortBy } from "../functions/utils";


export class TodoService {
    public static async getLists () {
        return (await SappService.listInstances<IList>("sapp_todo", "list")).page
    }

    public static async getList (id: number|string) {
        return (await SappService.detailInstance<IList>("sapp_todo", "list", id as number))
    }
    public static async getDefaultList ():Promise<IList> {
        const defaultList = (await SappService.listInstances<IList>("sapp_todo", "list", "?default=True&submit=Apply")).page.at(0)
        if (!defaultList) {
            await  SappService.createEditInstance("sapp_todo", "list", {name: "First", default: true})
            return await TodoService.getDefaultList()
        }
        return defaultList
    }

    public static async getItems (qs: string = "") {
        return (await SappService.listInstances<IItem>("sapp_todo", "item", qs)).page
    }
    public static async getSortedItems (qs: string = "") {
        return sortBy(await TodoService.getItems(qs), "edit_timestamp", -1)
    }
}
