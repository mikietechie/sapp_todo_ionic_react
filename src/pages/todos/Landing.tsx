import { useContext, useEffect, useRef, useState } from "react"
import { IItem, IList, getDefaultList, getSortedItems } from "../../data/todos"
import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonList, IonModal, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonRouter } from "@ionic/react"
import { Item, ItemForm } from "./Items"
import { libraryOutline, logOutOutline, searchOutline, settingsOutline, starOutline, sunnyOutline } from "ionicons/icons"
import { AuthContext } from "../../contexts/AuthContext"


export const LandingPage: React.FC<{}> = () => {
    const [items, setItems] = useState<IItem[]>([])
    const [defaultList, setDefaultList] = useState<IList>()
    const [date, setDate] = useState((new Date()).toJSON().slice(0, 10))
    const authCtx = useContext(AuthContext)
    const router = useIonRouter()
    const datePickerModal = useRef<HTMLIonModalElement>(null)

    useEffect(() => {
        getDefaultList().then((o) => setDefaultList(o))
    }, [])

    useEffect(() => {
        loadItems()
    }, [date])

    const logout = () => {
        localStorage.clear()
        authCtx?.setUser(undefined)
        router.push("/login")
    }

    const loadItems = async () => {
        setItems(await getSortedItems(`?submit=Apply&date=${date}`))
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
                        My Day
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                    <IonModal keepContentsMounted={true} ref={datePickerModal}>
                        <IonDatetime id="datetime" presentation="date" onIonChange={(e) => setDateFromPicker(e.target.value)}></IonDatetime>
                    </IonModal>
                    <IonButtons className="ion-justify-content-center">
                        <IonButton fill="clear" size="small" routerLink="/todo/search">
                            <IonIcon icon={searchOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/todo/history">
                            <IonIcon icon={libraryOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/todo/important">
                            <IonIcon icon={starOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/todo/settings">
                            <IonIcon icon={settingsOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" onClick={logout}>
                            <IonIcon icon={logOutOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
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