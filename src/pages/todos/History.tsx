import { useEffect, useState } from "react"
import { IItem, getSortedItems } from "../../data/todos"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react"
import { Item } from "./Items"
import { libraryOutline } from "ionicons/icons"

export const HistoryPage: React.FC<{}> = () => {
    const [items, setItems] = useState<IItem[]>([])

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        setItems(await getSortedItems(`?submit=Apply&done=True`))
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
                <IonList>
                    {
                        items.map((item, index) => <Item onUpdate={loadItems} key={index} item={item} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}