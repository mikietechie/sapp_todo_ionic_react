import { useEffect, useState } from "react"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { settingsOutline } from "ionicons/icons"
import { TodoService } from "../../data/services/todo-service"
import { SappService } from "../../data/services/sapp-service"
import { IList } from "../../data/structs/todo"

export const SettingsPage: React.FC<{}> = () => {
    const [lists, setLists] = useState<IList[]>([])

    useEffect(() => {
        loadLists()
    }, [])

    const loadLists = () => {
        return TodoService.getLists().then((listsArr) => setLists(listsArr))
    }

    const refresh = (e: CustomEvent) => {
        // loadItems().then(() => e.detail.complete())
        e.detail.complete()
    }

    const updateDefaultList = async (id: number|string) =>  {
        if (id) {
            await SappService.updateField("sapp_todo", "list", id, "default", true)
            await loadLists()
        }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={settingsOutline} className="ion-align-self-center" />&nbsp;
                        Settings
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {
                    lists.length && <IonItem>
                        <IonSelect label={`Set Default List (Currently ${lists.filter((i) => i.default).at(0)?.name})`} labelPlacement="stacked" onIonChange={(e) => updateDefaultList(e.target.value)}>
                            {
                                lists.map((list, index) => <IonSelectOption key={index} value={list.id}>{list.name}</IonSelectOption>)
                            }
                        </IonSelect>
                    </IonItem> || ""
                }
            </IonContent>
        </>
    )
}