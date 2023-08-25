import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect } from "react";
import { useAxios } from "../hooks/use-axios";

export const TestPage: React.FC<{}> = ({}) => {
    const {data, cancel, error, loaded} = useAxios("http://localhost:8000/", "get", {})
    console.log({data});

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Hello World</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-ion-padding">
                <h1>Hi Mike</h1>
            </IonContent>
        </IonPage>
    )
}