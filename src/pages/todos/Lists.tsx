import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonIcon, useIonViewDidEnter, IonItem, IonLabel, IonInput, InputCustomEvent, InputChangeEventDetail, IonButtons, IonBackButton } from "@ionic/react";
import { addCircle, listCircle, listOutline } from "ionicons/icons";
import { IList, getLists } from "../../data/todos";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { apiUrl, getAxiosConf } from "../../data/common";

export const List: React.FC<{list: IList}> = ({list}) => {
    return (
        <IonItem routerLink={`/todo/list/${list.id}`}>
            <IonIcon slot="start" icon={listCircle} />
            <IonLabel className="ion-text-wrap">
                <h2>{list.name}</h2>
                <p>{list.desc}</p>
            </IonLabel>
        </IonItem>
    )
}

export const ListForm: React.FC<{listsUpdated: () => void}> = ({listsUpdated}) => {
    const [name, setName] = useState("")

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()
        const res = await axios.post(`${apiUrl}add/sapp_todo/list/`, {name, default: true}, getAxiosConf())
        if (res.data?.id) {
            setName("")
            listsUpdated()
        }
    }

    return (
        <>
        <form onSubmit={submitForm}>
        <IonItem>
                <div slot="start" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <IonIcon slot="start" icon={addCircle} color="primary" />
                </div>
                <IonInput label="List name" defaultValue={name} labelPlacement="floating" clearInput={true} minlength={3} onIonInput={(e) => setName(e.target.value as never as string)}/>
        </IonItem>
        </form>
        </>
    )
}

export const ListsPage: React.FC<{}> = () => {
    const [lists, setLists] = useState<IList[]>([])

    useEffect(() => {
        loadLists()
    }, [])

    const loadLists = () => {
        return getLists().then((listsArr) => setLists(listsArr))
    }

    const refresh = (e: CustomEvent) => {
        loadLists().then(() => e.detail.complete())
    }

    return (
    <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/todo/home"></IonBackButton>
                </IonButtons>
                <IonTitle>
                    <IonIcon icon={listOutline} className="ion-align-self-center" />&nbsp;
                    Lists
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonRefresher slot="fixed" onIonRefresh={refresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                <ListForm listsUpdated={loadLists} />
                {
                    lists.map((list, index) => <List list={list} key={index} />)
                }
            </IonList>
        </IonContent>
    </>
)}