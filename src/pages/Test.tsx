import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect } from "react";

export const TestPage: React.FC<{}> = ({}) => {

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