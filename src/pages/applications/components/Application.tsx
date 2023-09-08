import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { IApplication, IProgram } from "../data/structs";
import { documentOutline } from "ionicons/icons";

export const Application: React.FC<{ application: IApplication }> = ({ application }) => {
    return (
        <IonItem className="application-item ion-margin-vertical" routerLink={`/application/${application.id}`}>
            <IonIcon icon={documentOutline} slot="start" />
            <IonLabel>
                <h2>{application.applicant}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, expedita.</p>
                <p>{application.creation_timestamp}</p>
            </IonLabel>
        </IonItem>
    )
}