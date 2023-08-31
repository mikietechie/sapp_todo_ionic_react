import { IonIcon, IonItem, IonLabel, IonInput, IonButton, IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, useIonModal, IonSkeletonText, IonList, IonItemGroup, IonSelect, IonSelectOption, IonDatetimeButton, IonDatetime, IonModal, IonListHeader, IonTextarea, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import { addCircle, addOutline, checkmark, checkmarkDoneOutline, checkmarkOutline, closeOutline, ellipsisVerticalOutline, pencilOutline, pulseOutline, starOutline, todayOutline,  trashBinOutline } from "ionicons/icons";
import { IItem, IList, IStep, TodoService, fmtDate, fmtDateJSON, fmtDateTime } from "../../data/todos";
import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { apiUrl, getAxiosConf } from "../../data/common";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";


const ItemSteps: React.FC<{item: IItem}> = ({item}) => {
    const [steps, setSteps] = useState<IStep[]>([])
    const inputRef = useRef<HTMLIonInputElement>(null)

    useEffect(() => {
        loadSteps()
    }, [])

    const loadSteps = async () => {
        setSteps((await TodoService.listInstances<IStep>("sapp_todo", "step", `?submit=Apply&item=${item.id}`)).page)
    }

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()
        const title = inputRef.current?.value
        if (!title) return
        await TodoService.createEditInstance("sapp_todo", "step", {title, item: item.id})
        inputRef.current.value = ""
        await loadSteps()
    }

    const deleteStep = async (step: IStep) => {
        await TodoService.deleteInstance("sapp_todo", "step", step.id)
        await loadSteps()
    }

    const updateDone = async (step: IStep) => {
        await TodoService.updateField("sapp_todo", "step", step.id, "done", !step.done)
        await loadSteps()
    }

    return (
        <IonList>
            <IonListHeader>
                <IonLabel>Steps</IonLabel>
            </IonListHeader>
            <form onSubmit={submitForm}>
                <IonItem>
                    <IonInput ref={inputRef} required={true} minlength={1} maxlength={128} label="Add Step" labelPlacement="floating" />
                    <IonButton type="submit" fill="solid">
                        <IonIcon icon={addOutline} />
                    </IonButton>
                </IonItem>
            </form>
            {
                steps.map((step, index) => (
                    <IonItem key={index}>
                        <IonLabel>
                            <p className={`ion-text-wrap ${step.done ? 'line-through': ''}`}>{step.title}</p>
                        </IonLabel>
                        <IonButtons slot="end">
                            <IonButton fill="clear" onClick={() => updateDone(step)}>
                                <IonIcon icon={step.done ? checkmarkDoneOutline : checkmarkOutline} />
                            </IonButton>
                            <IonButton fill="clear" onClick={() => deleteStep(step)}>
                                <IonIcon icon={trashBinOutline} />
                            </IonButton>
                        </IonButtons>
                    </IonItem>
                ))
            }
        </IonList>
    )
}

interface IItemDetailsModalProps {
    onDismiss: (data?: string | null | undefined | number, role?: string) => void,
    item: IItem
}

const ItemDetailsModal: React.FC<IItemDetailsModalProps> = ({ onDismiss, item}) => {
    const inputRef = useRef<HTMLIonInputElement>(null)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle class={item.done ? "line-through" : ""}>Item Details</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="medium" onClick={() => onDismiss(null, 'done')}>
                            <IonIcon icon={item.done ? checkmarkDoneOutline : checkmarkOutline} />
                        </IonButton>
                        <IonButton color="medium" onClick={() => onDismiss(null, 'delete')}>
                            <IonIcon icon={trashBinOutline} />
                        </IonButton>
                        <IonButton color={item.important ? "warning" : "medium"} onClick={() => onDismiss(null, 'important')}>
                            <IonIcon icon={starOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding overscroll">
                <IonItem>
                    <IonLabel>
                        <h1>{item.subject}</h1>
                    </IonLabel>
                </IonItem>
                <IonList>
                    <IonItemGroup>
                        <IonItem>
                            <IonLabel>
                                <p>Created On: {fmtDateTime(item.creation_timestamp)}</p>
                                <p>Last Updated: {fmtDateTime(item.edit_timestamp)}</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonSelect label="Priority" value={item.priority} labelPlacement="floating" interface="popover" onIonChange={(e) => TodoService.updateField("sapp_todo", "item", item.id, "priority", e.target.value)}>
                                {
                                    ["Medium", "Highest", "High", "Low", "Lowest"].map((v, index) => <IonSelectOption value={v} key={index}>{v}</IonSelectOption>)
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonInput type="date" label="Date" labelPlacement="floating" value={item.date || ""} />
                        </IonItem>
                        <IonItem lines="none">
                            <IonTextarea 
                            onIonBlur={(e) => TodoService.updateField("sapp_todo", "item", item.id, "details", e.target.value)}
                            label="Notes" maxlength={512} labelPlacement="stacked" autoGrow={true}
                            counter={true} value={item.details || ""}></IonTextarea>
                        </IonItem>
                    </IonItemGroup>
                </IonList>
                <ItemSteps item={item} />
            </IonContent>
        </IonPage>
    )
}


export const Item: React.FC<{ item: IItem, onUpdate: () => void }> = ({ item, onUpdate }) => {
    const [presentModal, dismissModal] = useIonModal(ItemDetailsModal, {
        onDismiss: (data: string, role: string) => dismissModal(data, role),
        item
    })

    const updateAttr = async (field: string, value: any, refresh: boolean = true) => {
        await TodoService.updateField("sapp_todo", "item", item!.id, field, value)
        if (refresh) {
            onUpdate()
        }
    }

    const deleteItem = async () => {
        const res = await axios.get(`${apiUrl}delete/sapp_todo/item/${item.id}/`, getAxiosConf())
        onUpdate()
    }

    const onMore = async () => {
        presentModal({
            onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
                if (ev.detail.role === 'delete') {
                    deleteItem()
                } else if (ev.detail.role === 'important') {
                    updateAttr("important", !item.important)
                } else if (ev.detail.role === 'done') {
                    updateAttr("done", !item.done)
                } else  {
                    onUpdate()
                }
            },
            initialBreakpoint: 1,
            breakpoints: [0, 5, 0.8, 0.9, 1],
        })
    }

    return (
        <>
            <IonItem>
                <IonButton slot="start" fill="outline" color={item.done ? "success" : "primary"} onClick={() => updateAttr("done", !item.done)}>
                    <IonIcon icon={item.done ? checkmarkDoneOutline : checkmark} />
                </IonButton>
                <IonLabel color={item.important ? "warning" : "dark"}>
                    <h2 className="ion-text-wrap" style={{ textDecoration: item.done ? "line-through" : "auto" }}>
                        {item.subject}
                    </h2>
                    <p className="ion-text-wrap">
                        {item.details || <b>No details provided!</b>}
                    </p>
                    {
                        item.date
                        ? <p className="ion-ion-padding-top">
                            <b>
                                {item.date === fmtDateJSON(new Date()) && <IonIcon color="primary" icon={todayOutline} /> || "" }
                                &nbsp;{fmtDate(item.date)}
                            </b><br/>
                        </p>
                        : <></>
                    }
                    <IonButtons slot="start">
                        <IonButton className="ion-no-margin" fill="clear" onClick={deleteItem}>
                            <IonIcon icon={trashBinOutline}  color="dark" />
                        </IonButton>
                        <IonButton className="ion-no-margin" fill="clear" onClick={() => updateAttr("important", !item.important)}>
                            <IonIcon icon={starOutline} color={item.important ? "warning" : "dark"} />
                        </IonButton>
                        <IonButton className="ion-no-margin" fill="clear" onClick={onMore}>
                            <IonIcon icon={ellipsisVerticalOutline}  color="dark" />
                        </IonButton>
                    </IonButtons>
                </IonLabel>
            </IonItem>
        </>
    )
}

export const ItemForm: React.FC<{ itemsUpdated: () => void, data: {list: IList, date?: string | Date, important?: boolean} }> = ({ itemsUpdated, data }) => {
    const [subject, setSubject] = useState("")

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()
        const res = await axios.post(
            `${apiUrl}add/sapp_todo/item/`,
            { subject, default: true, list: data.list.id, date: data?.date || null, important: data?.important || false },
            getAxiosConf()
        )
        if (res.data?.id) {
            setSubject("")
            itemsUpdated()
        }
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <IonItem>
                    <div slot="start" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IonIcon slot="start" icon={addCircle} color="primary" />
                    </div>
                    <IonInput label="Add Item" value={subject} labelPlacement="floating" clearInput={true} minlength={3} onIonInput={(e) => setSubject(e.target.value as never as string)} />
                </IonItem>
            </form>
        </>
    )
}
