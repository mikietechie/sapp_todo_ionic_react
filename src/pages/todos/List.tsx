import { useEffect, useRef, useState } from "react"
import { IItem, IList, TodoService, getList, getSortedItems } from "../../data/todos"
import axios from "axios"
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonActionSheet, useIonModal, useIonRouter, useIonToast } from "@ionic/react"
import { Item, ItemForm } from "./Items"
import { useParams } from "react-router"
import { listOutline } from "ionicons/icons"
import { apiUrl, getAxiosConf } from "../../data/common"
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces"

const RenameListModal: React.FC<{ onDismiss: any }> = ({ onDismiss, }: { onDismiss: (data?: string | null | undefined | number, role?: string) => void }) => {
    const inputRef = useRef<HTMLIonInputElement>(null)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButtons slot="start">
                            <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
                                Cancel
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Rename List</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => onDismiss(inputRef.current?.value, 'confirm')} strong={true}>
                                Confirm
                            </IonButton>
                        </IonButtons>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonInput ref={inputRef} labelPlacement="stacked" label="New List Name" placeholder="List name" />
                </IonItem>
            </IonContent>
        </IonPage>
    )
}

export const ListPage: React.FC<{}> = () => {
    const [items, setItems] = useState<IItem[]>([])
    const [list, setList] = useState<IList>()
    const [pendingOnly, setPendingOnly] = useState(true)
    const { listID } = useParams<{ listID: string }>()
    const [presentActionSheet] = useIonActionSheet()
    const [presentToast] = useIonToast()
    const router = useIonRouter()
    const [presentModal, dismissModal] = useIonModal(RenameListModal, {onDismiss: (data: string, role: string) => dismissModal(data, role)})


    useEffect(() => {
        if (!listID) router.push("/lists")
        loadList()
        loadItems()
    }, [])

    const loadList = async () => {
        setList((await getList(listID)).instance)
    }

    const loadItems = async () => {
        setItems(await getSortedItems(`?submit=Apply&done=${pendingOnly ? 'False' : ''}&list=${listID}`))
    }

    const refresh = async (e: CustomEvent) => {
        await loadItems()
        e.detail.complete()
    }

    const onHeaderClicked = () => {
        presentActionSheet({
            header: 'Actions',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    data: {
                        action: 'delete',
                    },
                },
                {
                    text: 'Rename',
                    data: {
                        action: 'rename',
                    },
                },
                {
                    text: 'Make Default',
                    data: {
                        action: 'default',
                    },
                },
                {
                    text: 'Archive',
                    data: {
                        action: 'archived',
                    },
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    data: {
                        action: 'cancel',
                    },
                },
            ],
            onDidDismiss: async ({detail}) => {
                const action = detail?.data?.action
                switch (action) {
                    case "delete":
                        await axios.get(`${apiUrl}delete/sapp_todo/list/${list?.id}/`, getAxiosConf())
                        await TodoService.deleteInstance("sapp_todo", "list", list!.id)
                        presentToast({ message: `List deleted!`, duration: 1500, buttons: ["Ok, noted!"], color: "danger" })
                        router.push("/lists")
                        break;
                    case "rename":
                        presentModal({
                            onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
                                if (ev.detail.role === 'confirm') {
                                    const name:string = ev.detail.data
                                    if (!name) return
                                    await TodoService.updateField("sapp_todo", "list", list!.id, "name", name)
                                    await loadList()
                                }
                            },
                            initialBreakpoint: 0.5,
                            breakpoints: [0, 0.25, 0.5, 0.75]
                        })
                        break;
                    case "default":
                        await TodoService.updateField("sapp_todo", "list", list!.id, "default", true)
                        await loadList()
                        break;
                    case "archived":
                        await TodoService.updateField("sapp_todo", "list", list!.id, "archived", true)
                        await loadList()
                        break;
                    default:
                        break;
                }
            }
        })
    }

    return (
        <>
            <IonHeader onClick={onHeaderClicked}>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/lists"></IonBackButton>
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
                <IonList className="pb-32">
                    {
                        list && <ItemForm itemsUpdated={loadItems} data={{ list: list }} /> || <></>
                    }
                    {
                        items.map((item, index) => <Item onUpdate={loadItems} key={index} item={item} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}