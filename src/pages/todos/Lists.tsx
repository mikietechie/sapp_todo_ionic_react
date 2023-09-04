import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonIcon, useIonViewDidEnter, IonItem, IonLabel, IonInput, InputCustomEvent, InputChangeEventDetail, IonButtons, IonBackButton } from "@ionic/react";
import { addCircle, listCircle, listOutline } from "ionicons/icons";
import React, { FormEvent, useEffect, useState } from "react";
import { IList } from "../../data/structs/todo";
import { TodoService } from "../../data/services/todo-service";
import { SappService } from "../../data/services/sapp-service";

export const List: React.FC<{list: IList}> = ({list}) => {
    return (
        <IonItem routerLink={`/list/${list.id}`}>
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
        const res = await SappService.createEditInstance("sapp_todo", "list", {name, default: true})
        if (res.id) {
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
                <IonInput label="List name" value={name} labelPlacement="floating" clearInput={true} minlength={3} maxlength={8} onIonInput={(e) => setName(e.target.value as never as string)}/>
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
        return TodoService.getLists().then((listsArr) => setLists(listsArr))
    }

    const refresh = (e: CustomEvent) => {
        loadLists().then(() => e.detail.complete())
    }

    return (
    <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home"></IonBackButton>
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