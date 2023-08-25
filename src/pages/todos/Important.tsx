import { useEffect, useState } from "react"
import { IItem, IList,  getDefaultList, getSortedItems } from "../../data/todos"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react"
import { Item, ItemForm } from "./Items"
import { starOutline } from "ionicons/icons"

export const ImportantPage: React.FC<{}> = () => {
    const [items, setItems] = useState<IItem[]>([])
    const [defaultList, setDefaultList] = useState<IList>()

    useEffect(() => {
        loadDefaultList()
    }, [])

    useEffect(() => {
        loadItems()
    }, [])

    const loadDefaultList = async () => {
        setDefaultList(await getDefaultList())
    }

    const loadItems = async () => {
        setItems(await getSortedItems(`?submit=Apply&important=True&done=False`))
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
                        <IonBackButton defaultHref="/todo/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={starOutline} className="ion-align-self-center" />&nbsp;
                        Important
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {
                        defaultList && <ItemForm itemsUpdated={loadItems} data={{list: defaultList, important: true}} /> || <></>
                    }
                    {
                        items.map((item, index) => <Item onUpdate={loadItems} key={index} item={item} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}