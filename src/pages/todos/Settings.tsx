import { useEffect, useState } from "react"
import { IList, getLists,  updateAttr } from "../../data/todos"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { settingsOutline } from "ionicons/icons"

export const SettingsPage: React.FC<{}> = () => {
    const [lists, setLists] = useState<IList[]>([])

    useEffect(() => {
        loadLists()
    }, [])

    const loadLists = () => {
        return getLists().then((listsArr) => setLists(listsArr))
    }

    const refresh = (e: CustomEvent) => {
        // loadItems().then(() => e.detail.complete())
        e.detail.complete()
    }

    const updateDefaultList = async (id: number|string) =>  {
        if (id) {
            await updateAttr("list", id, "default", true)
            await loadLists()
        }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/todo/home"></IonBackButton>
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