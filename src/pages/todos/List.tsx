import { useEffect, useState } from "react"
import { IItem, IList, getList, getSortedItems } from "../../data/todos"
import axios from "axios"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from "@ionic/react"
import { Item, ItemForm } from "./Items"
import { useParams } from "react-router"
import { listOutline } from "ionicons/icons"

export const ListPage: React.FC<{}> = () => {
    const [items, setItems] = useState<IItem[]>([])
    const [list, setList] = useState<IList>()
    const [pendingOnly, setPendingOnly] = useState(true)
    const { listID } = useParams<{listID: string}>()

    useEffect(() => {
        loadList()
        loadItems()
    }, [])

    const loadList = async () => {
        setList((await getList(listID)).instance)
    }

    const loadItems = async () => {
        setItems(await getSortedItems(`?submit=Apply&done=${pendingOnly ? 'False' : ''}&list=${listID}`))
    }

    const refresh = async(e: CustomEvent) => {
        await loadItems()
        e.detail.complete()
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/todo/lists"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={listOutline} className="ion-align-self-center" />&nbsp;
                        {list ? list.name : `List #${listID}`}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {
                        list && <ItemForm itemsUpdated={loadItems} data={{list: list}} /> || <></>
                    }
                    {
                        items.map((item, index) => <Item onUpdate={loadItems} key={index} item={item} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}