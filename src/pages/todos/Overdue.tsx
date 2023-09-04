import { useEffect, useState } from "react"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react"
import { Item } from "./Items"
import { alarmOutline } from "ionicons/icons"
import { TodoService } from "../../data/services/todo-service"
import { IItem } from "../../data/structs/todo"

export const OverduePage: React.FC<{}> = () => {
    const [items, setItems] = useState<IItem[]>([])

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        setItems(await TodoService.getSortedItems(`?submit=Apply&done=False&date__lte=${(new Date).toJSON().slice(0,10)}`))
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
                        <IonIcon icon={alarmOutline} className="ion-align-self-center" />&nbsp;
                        Overdue
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