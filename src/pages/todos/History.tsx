import { useEffect, useState } from "react"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react"
import { Item } from "./Items"
import { libraryOutline } from "ionicons/icons"
import { IItem } from "../../data/structs/todo"
import { TodoService } from "../../data/services/todo-service"

export const HistoryPage: React.FC<{}> = () => {
    const [items, setItems] = useState<IItem[]>([])

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        setItems(await TodoService.getSortedItems(`?submit=Apply&done=True`))
    }

    const refresh = async (e: CustomEvent) => {
        await loadItems()
        e.detail.complete()
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={libraryOutline} className="ion-align-self-center" />&nbsp;
                        History
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList className="pb-32">
                    {
                        items.map((item, index) => <Item onUpdate={loadItems} key={index} item={item} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}