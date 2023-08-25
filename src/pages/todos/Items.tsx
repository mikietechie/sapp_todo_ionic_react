import { IonIcon, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import { addCircle, checkmark, pencilOutline, starOutline, todayOutline,  trashBinOutline } from "ionicons/icons";
import { IItem, IList, fmtDate, fmtDateJSON } from "../../data/todos";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { apiUrl, getAxiosConf } from "../../data/common";


export const Item: React.FC<{ item: IItem, onUpdate: () => void }> = ({ item, onUpdate }) => {

    const updateAttr = async (attr: string, value: any, refresh: boolean = true) => {
        const res = await axios.post(`${apiUrl}method/sapp_todo/item/update_attr/`, {id: item.id, attr, value}, getAxiosConf())
        if (refresh) {
            onUpdate()
        }
    }

    const deleteItem = async () => {
        const res = await axios.get(`${apiUrl}delete/sapp_todo/item/${item.id}/`, getAxiosConf())
        onUpdate()
    }

    return (
        <>
            <IonItem>
                <IonButton slot="start" fill="outline" shape="round" color={item.done ? "success" : "light"} onClick={() => updateAttr("done", !item.done)}>
                    <IonIcon icon={checkmark} />
                </IonButton>
                <IonLabel color={item.important ? "warning" : "dark"}>
                    <h2 className="ion-text-wrap" style={{ textDecoration: item.done ? "line-through" : "auto" }}>
                        {item.subject}
                    </h2>
                    <p className="ion-text-wrap" dangerouslySetInnerHTML={{__html: item.details || `<b>No Details Provided</b>`}}></p>
                    <p className="ion-ion-padding-top">
                        {
                            item.date
                            ? <>
                                <b>
                                    {item.date === fmtDateJSON(new Date()) && <IonIcon color="primary" icon={todayOutline} /> || "" }
                                    &nbsp;{fmtDate(item.date)}
                                </b><br/>
                            </>
                            : <></>
                        }
                        {/* <i>Created</i>&nbsp;<b>{fmtDateTime(item.creation_timestamp)}</b><br/>
                        <i>Updated</i>&nbsp;<b>{fmtDateTime(item.edit_timestamp)}</b><br/> */}
                    </p>
                    <p className="ion-text-end">
                        <IonButton className="ion-no-margin" fill="clear" onClick={deleteItem}>
                            <IonIcon icon={trashBinOutline}  color="dark" />
                        </IonButton>
                        <IonButton className="ion-no-margin" fill="clear">
                            <IonIcon icon={pencilOutline}  color="dark" />
                        </IonButton>
                        <IonButton className="ion-no-margin" fill="clear" onClick={() => updateAttr("important", !item.important)}>
                            <IonIcon icon={starOutline} color={item.important ? "warning" : "dark"} />
                        </IonButton>
                    </p>
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
