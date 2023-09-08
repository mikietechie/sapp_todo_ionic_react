import { SappService } from "../../../data/services/sapp-service"
import { IApplication } from "./structs"
import {uniqBy} from "lodash"

export class ApplicationsService {
    public static async listMyApplications (userID: number): Promise<IApplication[]> {
        const [l1, l2] = await Promise.all([
            (await SappService.listInstances<IApplication>("sapp_applications", "application", `?submit=Apply&created_by=${userID}`)).page,
            (await SappService.listInstances<IApplication>("sapp_applications", "application", `?submit=Apply&applicant__user_id=${userID}`)).page
        ])
        return uniqBy([...l1, ...l2], (i) => i.id)
    }
}