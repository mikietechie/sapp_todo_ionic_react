import { useContext, useEffect, useRef, useState } from "react"
import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonList, IonModal, IonRefresher, IonRefresherContent, IonTitle, IonToolbar} from "@ionic/react"
import { Item, ItemForm } from "./Items"
import { alarmOutline, appsOutline, libraryOutline, logOutOutline, searchOutline, settingsOutline, starOutline, sunnyOutline } from "ionicons/icons"
import { AuthCtx } from "../../contexts/AuthCtx"
import { IItem, IList } from "../../data/structs/todo"
import { TodoService } from "../../data/services/todo-service"
import { SpaceCtx } from "../../contexts/SpaceCtx"


export const HomePage: React.FC<{}> = ({ }) => {
    const [items, setItems] = useState<IItem[]>([])
    const [defaultList, setDefaultList] = useState<IList>()
    const [date, setDate] = useState((new Date()).toJSON().slice(0, 10))
    const datePickerModal = useRef<HTMLIonModalElement>(null)
    const authCtx = useContext(AuthCtx)
    const spaceCtx = useContext(SpaceCtx)

    useEffect(() => {
        TodoService.getDefaultList().then((o) => {
            setDefaultList(o)
        })
    }, [])

    useEffect(() => {
        loadItems()
    }, [date])

    const loadItems = async () => {
        setItems(await TodoService.getSortedItems(`?submit=Apply&date=${date}`))
    }

    const refresh = async (e: CustomEvent) => {
        await loadItems()
        e.detail.complete()
    }

    const setDateFromPicker = (v: string | string[] | null | undefined) => {
        if (typeof v === "string") {
            setDate(v.slice(0, 10))
            datePickerModal.current?.dismiss()
        }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle color="primary">
                        <IonIcon icon={sunnyOutline} className="ion-align-self-center" />&nbsp;
                        {authCtx?.user?.username?.toLocaleUpperCase()}'s DAY
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                    <IonModal keepContentsMounted={true} ref={datePickerModal}>
                        <IonDatetime id="datetime" presentation="date" onIonChange={(e) => setDateFromPicker(e.target.value)}></IonDatetime>
                    </IonModal>
                    <IonButtons className="ion-justify-content-center">
                        <IonButton fill="clear" size="small" routerLink="/search">
                            <IonIcon icon={searchOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/history">
                            <IonIcon icon={libraryOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/important">
                            <IonIcon icon={starOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/overdue">
                            <IonIcon icon={alarmOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/settings">
                            <IonIcon icon={settingsOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" onClick={authCtx?.logout} >
                            <IonIcon icon={logOutOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" onClick={() => spaceCtx?.setSpace("space")} >
                            <IonIcon icon={appsOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList className="pb-100">
                    {
                        defaultList && <ItemForm itemsUpdated={loadItems} data={{ list: defaultList, date: date }} /> || <></>
                    }
                    {
                        items.map((item, index) => <Item onUpdate={loadItems} key={index} item={item} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}